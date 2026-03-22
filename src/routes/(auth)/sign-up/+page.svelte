<script lang="ts">
	import InnerShadowTopIcon from "@tabler/icons-svelte/icons/inner-shadow-top";
	import SignupForm from "$lib/components/auth/signup-form.svelte";

	let { data } = $props();
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
			<div class="w-full max-w-xs">
				<SignupForm form={data.form} />
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
