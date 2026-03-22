<script lang="ts">
	import { page } from '$app/state'
	import { Button } from '$lib/components/ui/button'
	import InnerShadowTopIcon from "@tabler/icons-svelte/icons/inner-shadow-top";
	import ArrowLeftIcon from "@tabler/icons-svelte/icons/arrow-left";
	import HomeIcon from "@tabler/icons-svelte/icons/home";
</script>

<div class="flex min-h-svh flex-col">
	<!-- Header -->
	<nav class="border-b border-border bg-background">
		<div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
			<a href="/" class="flex items-center gap-2 font-medium">
				<div class="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
					<InnerShadowTopIcon class="size-4" />
				</div>
				<span class="text-base font-semibold">Svelte Supabase</span>
			</a>
			<div class="flex items-center gap-3">
				<Button variant="outline" size="sm" onclick={() => history.back()}>
					<ArrowLeftIcon class="size-4" />
					Go Back
				</Button>
				<Button size="sm" href="/">
					<HomeIcon class="size-4" />
					Home
				</Button>
			</div>
		</div>
	</nav>

	<!-- Content -->
	<div class="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
		<div class="w-full max-w-3xl">
			<!-- Browser mockup -->
			<div class="rounded-lg border border-border overflow-hidden">
				<!-- Browser chrome -->
				<div class="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-3 sm:px-6">
					<div class="flex items-center gap-2">
						<div class="size-3 rounded-full bg-muted-foreground/20"></div>
						<div class="size-3 rounded-full bg-muted-foreground/30"></div>
						<div class="size-3 rounded-full bg-muted-foreground/20"></div>
					</div>
					<div class="hidden sm:block h-7 w-64 rounded-full bg-muted-foreground/10"></div>
					<div class="size-3 rounded-full bg-muted-foreground/20"></div>
				</div>

				<!-- Error content -->
				<div class="flex flex-col items-center justify-center px-6 py-16 sm:py-24 text-center bg-background">
					<!-- Status code -->
					<div class="relative mb-8">
						<span class="text-[8rem] sm:text-[10rem] font-bold leading-none tracking-tighter text-muted-foreground/10 select-none">
							{page.status}
						</span>
						<div class="absolute inset-0 flex items-center justify-center">
							<!-- Search/magnifying glass icon -->
							<svg class="size-20 sm:size-24 text-primary/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
								<circle cx="11" cy="11" r="8" />
								<path d="m21 21-4.3-4.3" />
								<path d="M8 11h6" class={page.status === 404 ? '' : 'hidden'} />
							</svg>
						</div>
					</div>

					<!-- Message -->
					<h1 class="text-xl sm:text-2xl font-semibold text-foreground mb-2">
						{#if page.status === 404}
							Page not found
						{:else if page.status === 500}
							Internal server error
						{:else if page.status === 403}
							Access denied
						{:else}
							Something went wrong
						{/if}
					</h1>
					<p class="text-sm sm:text-base text-muted-foreground max-w-md">
						{page.error?.message ?? "The page you're looking for doesn't exist or has been moved."}
					</p>

					<!-- Actions -->
					<div class="mt-8 flex flex-col sm:flex-row items-center gap-3">
						<Button variant="outline" onclick={() => history.back()}>
							<ArrowLeftIcon class="size-4" />
							Go Back
						</Button>
						<Button href="/">
							<HomeIcon class="size-4" />
							Back to Home
						</Button>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Footer -->
	<footer class="border-t border-border py-6">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<p class="text-center text-sm text-muted-foreground">
				&copy; {new Date().getFullYear()} Svelte Supabase. All rights reserved.
			</p>
		</div>
	</footer>
</div>
