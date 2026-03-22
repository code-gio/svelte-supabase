<script lang="ts">
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import AppSidebar from "$lib/components/layout/app-sidebar.svelte";
	import SiteHeader from "$lib/components/layout/site-header.svelte";
	let { data, children } = $props();
</script>

<Sidebar.Provider
	style="--sidebar-width: calc(var(--spacing) * 72); --header-height: calc(var(--spacing) * 12);"
>
	<AppSidebar user={data.user} variant="inset" />
	<Sidebar.Inset>
		<SiteHeader />
		<div class="flex flex-1 flex-col">
            {@render children()}
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>
