import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async (event) => {
  const {
    url,
    locals: { supabase },
  } = event;
  const code = url.searchParams.get("code") as string;
  const next = url.searchParams.get("next") ?? "/";

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      throw redirect(303, next);
    }
  }

  throw redirect(303, "/auth/error");
};
