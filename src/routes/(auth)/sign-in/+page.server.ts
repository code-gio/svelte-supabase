import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { signInSchema } from "$lib/schemas/sign-in";

export const load: PageServerLoad = async () => {
	return { form: undefined as { message?: string } | undefined };
};

export const actions: Actions = {
	signin: async (event) => {
		const formData = await event.request.formData();
		const email = formData.get("email");
		const password = formData.get("password");

		const parsed = signInSchema.safeParse({ email, password });
		if (!parsed.success) {
			const message = parsed.error.issues[0]?.message ?? "Invalid email or password";
			return fail(400, { message });
		}

		const { error } = await event.locals.supabase.auth.signInWithPassword({
			email: parsed.data.email,
			password: parsed.data.password,
		});

		if (error) {
			return fail(400, { message: error.message ?? "Invalid email or password" });
		}

		redirect(303, "/");
	},

	github: async (event) => {
		const { data, error } = await event.locals.supabase.auth.signInWithOAuth({
			provider: "github",
			options: {
				redirectTo: `${event.url.origin}/auth/callback`,
			},
		});

		if (error) {
			return fail(400, { message: error.message ?? "Failed to sign in with GitHub" });
		}

		if (data.url) {
			redirect(303, data.url);
		}
	},
};
