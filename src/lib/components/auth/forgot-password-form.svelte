<script lang="ts">
	import {
		FieldGroup,
		Field,
		FieldLabel,
	} from "$lib/components/ui/field/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import { cn } from "$lib/utils.js";
	import { toast } from "svelte-sonner";
	import Mail from "@lucide/svelte/icons/mail";
	import Loader2 from "@lucide/svelte/icons/loader-2";
	import ArrowLeft from "@lucide/svelte/icons/arrow-left";

	let emailSent = $state(false);
	let submittedEmail = $state("");
	let isSubmitting = $state(false);

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);
		const email = formData.get("email")?.toString()?.trim();

		if (!email) {
			toast.error("Please enter your email address.");
			return;
		}

		isSubmitting = true;
		try {
			const res = await fetch("/auth/forgot-password", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email }),
			});
			const data = (await res.json()) as { success?: boolean; email?: string; message?: string };

			if (data?.success && data?.email) {
				submittedEmail = data.email;
				emailSent = true;
			} else {
				toast.error(data?.message ?? "Failed to send reset email", {
					description: "Please check your email address and try again.",
				});
			}
		} catch {
			toast.error("Something went wrong. Please try again.");
		} finally {
			isSubmitting = false;
		}
	}
</script>

<div class="space-y-6">
	{#if emailSent}
		<div
			class="rounded-lg border border-border bg-muted/50 p-4 text-sm text-muted-foreground"
		>
			<div class="flex items-center gap-2 font-medium text-foreground">
				<Mail class="size-4" />
				Check your email
			</div>
			<p class="mt-2">
				We've sent a password reset link to <strong>{submittedEmail}</strong>
			</p>
			<Button href="/sign-in" variant="outline" class="mt-4 w-full">
				<ArrowLeft class="size-4" />
				Back to sign in
			</Button>
		</div>
	{:else}
		<form
			class={cn("flex flex-col gap-6")}
			onsubmit={handleSubmit}
			aria-label="Password reset form"
		>
			<FieldGroup>
				<div class="flex flex-col items-center gap-1 text-center">
					<h1 class="text-2xl font-bold">Forgot your password?</h1>
					<p class="text-muted-foreground text-sm text-balance">
						Enter your email below and we'll send you a link to reset your password.
					</p>
				</div>
				<Field>
					<FieldLabel for="forgot-email">Email address</FieldLabel>
					<Input
						id="forgot-email"
						name="email"
						type="email"
						placeholder="you@example.com"
						autocomplete="email"
						required
						disabled={isSubmitting}
					/>
				</Field>
				<Field>
					<Button type="submit" class="w-full" disabled={isSubmitting}>
						{#if isSubmitting}
							<Loader2 class="size-4 animate-spin" />
							Sending reset link...
						{:else}
							Send reset link
						{/if}
					</Button>
				</Field>
			</FieldGroup>
		</form>

		<div class="text-center text-sm">
			<p class="text-muted-foreground">
				Remember your password?
				<a href="/sign-in" class="underline underline-offset-4 hover:text-foreground">
					Sign in
				</a>
			</p>
		</div>
	{/if}
</div>
