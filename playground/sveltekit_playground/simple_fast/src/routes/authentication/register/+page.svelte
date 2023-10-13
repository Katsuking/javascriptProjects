<script>
	// how to authenticate a user

	/** @type {import('./$types').Actions} */
	export let form;
</script>

<h1>How to authenticate a user</h1>

<form action="?/register" method="POST">
	<input name="username" type="text" placeholder="Enter uername" required />
	<input
		name="password"
		type="password"
		placeholder="Enter password"
		required
	/>
	<button type="submit">Register</button>
</form>

{#if form?.user}
	<p class=" text-red-500">Username is taken. Please try other username.</p>
{/if}
