import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { forgotPasswordSchema } from "$lib/schemas/forgot-password";

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const email = formData.get("email");

		const parsed = forgotPasswordSchema.safeParse({ email });
		if (!parsed.success) {
			const message = parsed.error.issues[0]?.message ?? "Invalid email address";
			return fail(400, { success: false, message });
		}

		const { supabase } = event.locals;
		const redirectTo = `${event.url.origin}/auth/confirm`;

		const { error } = await supabase.auth.resetPasswordForEmail(parsed.data.email, {
			redirectTo,
		});

		if (error) {
			return fail(400, {
				success: false,
				message: error.message ?? "Failed to send reset email",
			});
		}

		return {
			success: true,
			email: parsed.data.email,
		};
	},
};
