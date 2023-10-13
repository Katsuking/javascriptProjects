<script>
	// https://kit.svelte.dev/docs/modules#$app-stores
	import "../app.css";
	import { page } from "$app/stores";
</script>

<!-- https://learn.svelte.dev/tutorial/svelte-head -->
<svelte:head>
	<title>Sveltekit Auth</title>
</svelte:head>

{#if !$page.data.user}
	<div class="p-5">
		<a href="/authentication/login">login</a>
		<a href="/authentication/register">signup</a>
	</div>
{/if}

{#if $page.data.user}
	<form action="/authentication/logout" method="POST">
		<button type="submit">Logout</button>
	</form>
{/if}

<slot />
