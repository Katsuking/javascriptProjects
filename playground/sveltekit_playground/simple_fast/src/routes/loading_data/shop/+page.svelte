<script>
	export let data;
	// console.log(data);

	const { products, users } = data;
</script>

<a href="/">home</a>
<h1 class="px-5">shop</h1>
<div>
	<h2 class="text-center">check +Page.js</h2>
	{#each products as product (product.id)}
		<h1 class="p-5">title: {product.title}</h1>
		<div>{product.description}</div>
	{/each}
</div>

<div class="grid grid-cols-2">
	{#each users as user (user.id)}
		<div class="p-5">
			<h1 class="p-5">User ID: {user.id}</h1>
			<div>Name: {user.firstName} {user.lastName}</div>
		</div>
	{/each}
</div>
