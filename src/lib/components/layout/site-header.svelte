<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import { Separator } from "$lib/components/ui/separator/index.js";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import { toggleMode } from "mode-watcher";
	import SunIcon from "@tabler/icons-svelte/icons/sun";
	import MoonIcon from "@tabler/icons-svelte/icons/moon";
</script>

<header
	class="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)"
>
	<div class="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
		<Sidebar.Trigger class="-ms-1" />
		<Separator orientation="vertical" class="mx-2 data-[orientation=vertical]:h-4" />
		<h1 class="text-base font-medium">Documents</h1>
		<div class="ms-auto flex items-center gap-2">
			<Button
				variant="ghost"
				size="icon"
				class="size-8"
				onclick={toggleMode}
				aria-label="Toggle dark mode"
			>
				<SunIcon class="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
				<MoonIcon class="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
			</Button>
			<Button
				href="https://github.com/shadcn-ui/ui/tree/main/apps/v4/app/(examples)/dashboard"
				variant="ghost"
				size="sm"
				class="dark:text-foreground hidden sm:flex"
				target="_blank"
				rel="noopener noreferrer"
			>
				GitHub
			</Button>
		</div>
	</div>
</header>
