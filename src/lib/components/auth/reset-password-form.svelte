<script lang="ts">
	import {
		FieldGroup,
		Field,
		FieldLabel,
		FieldDescription,
	} from "$lib/components/ui/field/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import { cn } from "$lib/utils.js";
	import { toast } from "svelte-sonner";
	import { goto } from "$app/navigation";
	import Loader2 from "@lucide/svelte/icons/loader-2";
	import CheckCircle from "@lucide/svelte/icons/check-circle-2";

	let isSubmitting = $state(false);
	let success = $state(false);

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);
		const password = formData.get("password")?.toString();
		const confirmPassword = formData.get("confirm_password")?.toString();

		if (!password || !confirmPassword) {
			toast.error("Please fill in both password fields.");
			return;
		}

		if (password !== confirmPassword) {
			toast.error("Passwords do not match.");
			return;
		}

		isSubmitting = true;
		try {
			const res = await fetch("/auth/reset-password", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ password }),
			});
			const data = (await res.json()) as { success?: boolean; message?: string };

			if (data?.success) {
				success = true;
				setTimeout(() => goto("/sign-in"), 2000);
			} else {
				toast.error(data?.message ?? "Failed to reset password.");
			}
		} catch {
			toast.error("Something went wrong. Please try again.");
		} finally {
			isSubmitting = false;
		}
	}
</script>

<div class="space-y-6">
	{#if success}
		<div
			class="rounded-lg border border-border bg-muted/50 p-4 text-sm text-muted-foreground"
		>
			<div class="flex items-center gap-2 font-medium text-foreground">
				<CheckCircle class="size-4" />
				Password updated
			</div>
			<p class="mt-2">
				Your password has been reset successfully. Redirecting to sign in...
			</p>
		</div>
	{:else}
		<form
			class={cn("flex flex-col gap-6")}
			onsubmit={handleSubmit}
			aria-label="Reset password form"
		>
			<FieldGroup>
				<div class="flex flex-col items-center gap-1 text-center">
					<h1 class="text-2xl font-bold">Reset your password</h1>
					<p class="text-muted-foreground text-sm text-balance">
						Enter your new password below.
					</p>
				</div>
				<Field>
					<FieldLabel for="reset-password">New password</FieldLabel>
					<Input
						id="reset-password"
						name="password"
						type="password"
						required
						disabled={isSubmitting}
					/>
					<FieldDescription>
						Must be at least 8 characters with uppercase, lowercase, number and special character.
					</FieldDescription>
				</Field>
				<Field>
					<FieldLabel for="reset-confirm-password">Confirm password</FieldLabel>
					<Input
						id="reset-confirm-password"
						name="confirm_password"
						type="password"
						required
						disabled={isSubmitting}
					/>
				</Field>
				<Field>
					<Button type="submit" class="w-full" disabled={isSubmitting}>
						{#if isSubmitting}
							<Loader2 class="size-4 animate-spin" />
							Updating password...
						{:else}
							Update password
						{/if}
					</Button>
				</Field>
			</FieldGroup>
		</form>
	{/if}
</div>
