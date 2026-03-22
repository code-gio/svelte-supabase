<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Toaster } from 'svelte-sonner';
	import { invalidate } from '$app/navigation'
	import { onMount } from 'svelte'
	import { ModeWatcher } from "mode-watcher";

	let { data, children } = $props()

	let { supabase, session } = $derived(data)
	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth')
			}
		})
		return () => data.subscription.unsubscribe()
	})
</script>
<svelte:head>
	<title>Svelte Supabase</title>
	<link rel="icon" href={favicon} />
</svelte:head>
<ModeWatcher />
<Toaster richColors />
{@render children()}
