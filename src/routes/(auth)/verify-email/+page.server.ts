import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals, url }) => {
	const { session, user } = await locals.safeGetSession();

	// Already logged in and verified — go to dashboard
	if (session && user?.email_confirmed_at) {
		redirect(302, "/");
	}

	// Get email from session (if logged in but unverified) or from query param (after sign-up)
	const email = user?.email ?? url.searchParams.get("email");

	if (!email) {
		redirect(302, "/sign-in");
	}

	return { email };
};
