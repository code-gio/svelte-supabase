<script lang="ts">
	import InnerShadowTopIcon from "@tabler/icons-svelte/icons/inner-shadow-top";
	import ShieldLockIcon from "@tabler/icons-svelte/icons/shield-lock";
	import DatabaseIcon from "@tabler/icons-svelte/icons/database";
	import LayoutDashboardIcon from "@tabler/icons-svelte/icons/layout-dashboard";
	import ComponentsIcon from "@tabler/icons-svelte/icons/components";
	import BrandTypescriptIcon from "@tabler/icons-svelte/icons/brand-typescript";
	import ChartBarIcon from "@tabler/icons-svelte/icons/chart-bar";
	import TableIcon from "@tabler/icons-svelte/icons/table";
	import LockIcon from "@tabler/icons-svelte/icons/lock";
	import ArrowRightIcon from "@tabler/icons-svelte/icons/arrow-right";

	import { Button } from "$lib/components/ui/button";
	import { Badge } from "$lib/components/ui/badge";
	import { Separator } from "$lib/components/ui/separator";
	import * as Card from "$lib/components/ui/card";

	const features = [
		{
			icon: ShieldLockIcon,
			title: "Authentication",
			description:
				"Email/password sign-up & sign-in, GitHub OAuth, forgot/reset password, and email verification resend.",
		},
		{
			icon: LockIcon,
			title: "Session & Route Protection",
			description:
				"Secure server-side JWT validation, cookie-based SSR, hooks-based auth guard, and layout-level redirects.",
		},
		{
			icon: ComponentsIcon,
			title: "22+ UI Components",
			description:
				"shadcn/svelte components including data table, sidebar, charts, drawers, dropdowns, and more.",
		},
		{
			icon: LayoutDashboardIcon,
			title: "Dashboard",
			description:
				"Sample dashboard with interactive charts, drag-and-drop data table, and section cards.",
		},
		{
			icon: DatabaseIcon,
			title: "Database & RLS",
			description:
				"Profiles table migration with row-level security policies and auto-profile creation trigger.",
		},
		{
			icon: BrandTypescriptIcon,
			title: "Type Safety",
			description:
				"Full TypeScript with typed Supabase client and Zod schema validation throughout.",
		},
		{
			icon: ChartBarIcon,
			title: "Charts & Visualizations",
			description:
				"Interactive charts powered by LayerChart and D3 with full theme support.",
		},
		{
			icon: TableIcon,
			title: "Data Table",
			description:
				"TanStack Table with drag-and-drop column reordering via DND Kit.",
		},
	];

	const techStack = [
		{ name: "SvelteKit", detail: "Svelte 5" },
		{ name: "Supabase", detail: "Auth & Database" },
		{ name: "Tailwind CSS", detail: "v4" },
		{ name: "shadcn/svelte", detail: "UI Components" },
		{ name: "LayerChart", detail: "D3 Charts" },
		{ name: "TanStack Table", detail: "Data Table" },
		{ name: "Zod", detail: "Validation" },
		{ name: "TypeScript", detail: "Type Safety" },
	];
</script>

<div class="flex min-h-svh flex-col">
	<!-- Hero -->
	<header class="flex flex-col items-center justify-center gap-8 px-6 py-24 text-center md:py-32">
		<div class="flex items-center gap-2">
			<div
				class="bg-primary text-primary-foreground flex size-10 items-center justify-center rounded-lg"
			>
				<InnerShadowTopIcon class="size-6" />
			</div>
			<span class="text-2xl font-bold">Svelte Supabase</span>
		</div>

		<div class="flex max-w-2xl flex-col gap-4">
			<h1 class="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
				Production-Ready Starter Template
			</h1>
			<p class="text-muted-foreground text-lg md:text-xl">
				Built with SvelteKit, Supabase, shadcn/svelte, and Tailwind CSS v4. Everything you
				need to ship your next app — auth, dashboard, database, and 22+ UI components.
			</p>
		</div>

		<div class="flex flex-wrap items-center justify-center gap-3">
			<Button href="/sign-in" size="lg">
				Get Started
				<ArrowRightIcon class="ml-2 size-4" />
			</Button>
			<Button href="/sign-up" variant="outline" size="lg">Create Account</Button>
		</div>
	</header>

	<Separator />

	<!-- Tech Stack -->
	<section class="px-6 py-16 md:py-20">
		<div class="mx-auto max-w-5xl">
			<h2 class="mb-8 text-center text-2xl font-bold md:text-3xl">Tech Stack</h2>
			<div class="flex flex-wrap items-center justify-center gap-3">
				{#each techStack as tech}
					<Badge variant="secondary" class="px-4 py-2 text-sm">
						<span class="font-semibold">{tech.name}</span>
						<span class="text-muted-foreground ml-1.5">{tech.detail}</span>
					</Badge>
				{/each}
			</div>
		</div>
	</section>

	<Separator />

	<!-- Features -->
	<section class="px-6 py-16 md:py-20">
		<div class="mx-auto max-w-6xl">
			<h2 class="mb-4 text-center text-2xl font-bold md:text-3xl">Features</h2>
			<p class="text-muted-foreground mx-auto mb-12 max-w-2xl text-center text-lg">
				Everything included out of the box so you can focus on building your product.
			</p>

			<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{#each features as feature}
					<Card.Card class="flex flex-col">
						<Card.CardHeader>
							<div
								class="bg-primary/10 text-primary mb-2 flex size-10 items-center justify-center rounded-lg"
							>
								<feature.icon class="size-5" />
							</div>
							<Card.CardTitle>{feature.title}</Card.CardTitle>
						</Card.CardHeader>
						<Card.CardContent class="flex-1">
							<p class="text-muted-foreground text-sm">{feature.description}</p>
						</Card.CardContent>
					</Card.Card>
				{/each}
			</div>
		</div>
	</section>

	<Separator />

	<!-- Project Structure Preview -->
	<section class="px-6 py-16 md:py-20">
		<div class="mx-auto max-w-3xl">
			<h2 class="mb-4 text-center text-2xl font-bold md:text-3xl">Project Structure</h2>
			<p class="text-muted-foreground mx-auto mb-8 max-w-xl text-center text-lg">
				Clean, organized architecture with clear separation of concerns.
			</p>

			<Card.Card>
				<Card.CardContent class="p-6">
					<pre
						class="text-muted-foreground overflow-x-auto text-sm leading-relaxed"><code
							>src/
├── hooks.server.ts              # Supabase client + auth guard
├── lib/
│   ├── components/
│   │   ├── auth/                # Login, signup, password forms
│   │   ├── dashboard/           # Data table, charts, cards
│   │   ├── layout/              # Sidebar, navigation, header
│   │   └── ui/                  # 22+ shadcn/svelte components
│   ├── schemas/                 # Zod validation schemas
│   ├── types/                   # Supabase Database types
│   └── utils/                   # CSRF protection & helpers
├── routes/
│   ├── (app)/                   # Protected routes (auth required)
│   │   └── dashboard/           # Dashboard with charts & tables
│   └── (auth)/                  # Public auth routes
│       ├── sign-in / sign-up    # Authentication pages
│       └── forgot / reset       # Password recovery
supabase/
├── migrations/                  # Database migrations + RLS
└── config.toml                  # Local dev configuration</code
						></pre>
				</Card.CardContent>
			</Card.Card>
		</div>
	</section>

	<Separator />

	<!-- CTA -->
	<section class="px-6 py-16 md:py-24">
		<div class="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
			<h2 class="text-2xl font-bold md:text-3xl">Ready to Build?</h2>
			<p class="text-muted-foreground text-lg">
				Sign up to explore the dashboard, or sign in if you already have an account.
			</p>
			<div class="flex flex-wrap items-center justify-center gap-3">
				<Button href="/sign-up" size="lg">
					Create Account
					<ArrowRightIcon class="ml-2 size-4" />
				</Button>
				<Button href="/sign-in" variant="outline" size="lg">Sign In</Button>
			</div>
		</div>
	</section>

	<!-- Footer -->
	<footer
		class="text-muted-foreground mt-auto border-t px-6 py-8 text-center text-sm"
	>
		<p>
			Built with SvelteKit, Supabase, shadcn/svelte & Tailwind CSS v4.
		</p>
	</footer>
</div>
