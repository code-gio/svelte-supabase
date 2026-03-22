import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { forgotPasswordSchema } from "$lib/schemas/forgot-password";
import { csrfProtection } from "$lib/utils/csrf";

export const POST: RequestHandler = async (event) => {
	const csrfError = csrfProtection(event);
	if (csrfError) return csrfError;

	try {
		const body = await event.request.json();
		const parsed = forgotPasswordSchema.safeParse(body);

		if (!parsed.success) {
			const message = parsed.error.issues[0]?.message ?? "Invalid email address";
			return json({ success: false, message }, { status: 400 });
		}

		const { supabase } = event.locals;
		const redirectTo = `${event.url.origin}/auth/confirm`;

		const { error } = await supabase.auth.resetPasswordForEmail(parsed.data.email, {
			redirectTo,
		});

		if (error) {
			return json(
				{
					success: false,
					message: error.message ?? "Failed to send reset email",
				},
				{ status: 400 }
			);
		}

		return json({ success: true, email: parsed.data.email });
	} catch {
		return json(
			{ success: false, message: "Internal server error" },
			{ status: 500 }
		);
	}
};
