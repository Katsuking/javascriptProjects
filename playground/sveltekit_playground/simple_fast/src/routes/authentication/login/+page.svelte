<script>
	export let form;
</script>

<h1>Login</h1>

<form action="?/login" method="POST">
	<div>
		<label for="username">Username</label>
		<input name="username" type="text" placeholder=" Enter username" required />
	</div>
	<div>
		<label for="password">Password</label>
		<input
			name="password"
			type="password"
			placeholder=" Enter password"
			required
		/>
	</div>
	<button type="submit" class="border bg-emerald-300">Login</button>
</form>

{#if form?.invalid}
	<p class="text-red-500">Please check username and password again</p>
{/if}

{#if form?.credential}
	<p class="text-red-500">Entered wrong credentials</p>
{/if}
