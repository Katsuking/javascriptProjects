<script>
	import { page } from "$app/stores";
</script>

<h1>Admin page</h1>

{#if $page.data.user}
	<p>welcome {$page.data.user.name}</p>
{/if}

{#if $page.data.user.role === "ADMIN"}
	<p>you are admin!!</p>
	<form action="/authentication/logout" method="POST">
		<button type="submit">Log out</button>
	</form>
{/if}
