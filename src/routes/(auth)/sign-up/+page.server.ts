import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { signUpSchema } from "$lib/schemas/sign-up";

export const load: PageServerLoad = async () => {
	return { form: undefined as { message?: string } | undefined };
};

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const first_name = formData.get("first_name");
		const last_name = formData.get("last_name");
		const email = formData.get("email");
		const password = formData.get("password");

		const parsed = signUpSchema.safeParse({
			first_name,
			last_name,
			email,
			password,
		});
		if (!parsed.success) {
			const message = parsed.error.issues[0]?.message ?? "Please check your input";
			return fail(400, { message });
		}

		const { error } = await event.locals.supabase.auth.signUp({
			email: parsed.data.email,
			password: parsed.data.password,
			options: {
				data: {
					first_name: parsed.data.first_name,
					last_name: parsed.data.last_name,
				},
			},
		});

		if (error) {
			return fail(400, { message: error.message ?? "Failed to create account" });
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
