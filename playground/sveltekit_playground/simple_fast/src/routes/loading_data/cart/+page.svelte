<script>
	export let data;
	console.log(data);

	const { products } = data;
	// console.log("cart 1:", products.carts[0]);
</script>

<a href="/">home</a>

<!-- {#each products as product (product.id)}
	<p>{product.title}</p>
{/each} -->
