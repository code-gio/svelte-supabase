// src/hooks.server.ts
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY } from '$env/static/public'
import { createServerClient } from '@supabase/ssr'
import { redirect, type Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'

const supabase: Handle = async ({ event, resolve }) => {
  event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY, {
    cookies: {
      getAll: () => event.cookies.getAll(),
      /**
       * Note: You have to add the `path` variable to the
       * set and remove method due to sveltekit's cookie API
       * requiring this to be set, setting the path to `/`
       * will replicate previous/standard behaviour (https://kit.svelte.dev/docs/types#public-types-cookies)
       */
      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, value, options }) => {
          event.cookies.set(name, value, { ...options, path: '/' })
        })
      },
    },
  })

  /**
   * Unlike `supabase.auth.getSession`, which is unsafe on the server because it
   * doesn't validate the JWT, this function validates the JWT by first calling
   * `getUser` and aborts early if the JWT signature is invalid.
   */
  event.locals.safeGetSession = async () => {
    const {
      data: { user },
      error,
    } = await event.locals.supabase.auth.getUser()
    if (error) {
      return { session: null, user: null }
    }

    const {
      data: { session },
    } = await event.locals.supabase.auth.getSession()
    return { session, user }
  }

  return resolve(event, {
    filterSerializedResponseHeaders(name: string) {
      return name === 'content-range' || name === 'x-supabase-api-version'
    },
  })
}

const AUTH_ROUTES = ['/sign-in', '/sign-up', '/forgot-password']

const authGuard: Handle = async ({ event, resolve }) => {
  const { session } = await event.locals.safeGetSession()
  const path = event.url.pathname

  // Redirect authenticated users away from auth pages
  if (session && AUTH_ROUTES.some((route) => path.startsWith(route))) {
    redirect(303, '/')
  }

  return resolve(event)
}

export const handle = sequence(supabase, authGuard)
