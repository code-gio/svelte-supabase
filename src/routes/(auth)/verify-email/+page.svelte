<script lang="ts">
	import InnerShadowTopIcon from "@tabler/icons-svelte/icons/inner-shadow-top";
	import { Button } from "$lib/components/ui/button/index.js";
	import { toast } from "svelte-sonner";
	import Loader2 from "@lucide/svelte/icons/loader-2";
	import Mail from "@lucide/svelte/icons/mail";

	let { data } = $props();
	let resending = $state(false);
	let resent = $state(false);

	async function resendVerification() {
		if (!data.email) return;
		resending = true;

		try {
			const res = await fetch("/auth/resend-verification", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email: data.email }),
			});

			const json = (await res.json()) as { success?: boolean; message?: string };

			if (res.ok) {
				resent = true;
				toast.success("Verification email sent");
			} else {
				toast.error(json.message ?? "Failed to resend verification email");
			}
		} catch {
			toast.error("Something went wrong. Please try again.");
		} finally {
			resending = false;
		}
	}
</script>

<div class="grid min-h-svh lg:grid-cols-2">
	<div class="flex flex-col gap-4 p-6 md:p-10">
		<div class="flex justify-center gap-2 md:justify-start">
			<a href="/" class="flex items-center gap-2 font-medium">
				<div
					class="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md"
				>
					<InnerShadowTopIcon class="size-4" />
				</div>
				Svelte Supabase
			</a>
		</div>
		<div class="flex flex-1 items-center justify-center">
			<div class="w-full max-w-xs space-y-6">
				<div class="flex flex-col items-center gap-1 text-center">
					<div class="bg-muted mb-2 flex size-12 items-center justify-center rounded-full">
						<Mail class="text-muted-foreground size-6" />
					</div>
					<h1 class="text-2xl font-bold">Verify your email</h1>
					<p class="text-muted-foreground text-sm text-balance">
						We sent a verification link to
						<span class="text-foreground font-medium">{data.email}</span>.
						Please check your inbox and click the link to continue.
					</p>
				</div>
				<div class="flex flex-col gap-3">
					<Button
						onclick={resendVerification}
						disabled={resending || resent}
						variant="outline"
						class="w-full"
					>
						{#if resent}
							Email sent — check your inbox
						{:else if resending}
							<Loader2 class="size-4 animate-spin" />
							Sending...
						{:else}
							Resend verification email
						{/if}
					</Button>
					<Button href="/sign-in" variant="ghost" class="w-full">
						Back to sign in
					</Button>
				</div>
			</div>
		</div>
	</div>
	<div class="bg-muted relative hidden lg:block">
		<img
			src="/placeholder.svg"
			alt=""
			class="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
		/>
	</div>
</div>
