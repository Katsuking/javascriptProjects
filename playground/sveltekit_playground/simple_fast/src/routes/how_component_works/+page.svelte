<script>
	import ThisIsComponent from "$lib/This_is_component.svelte";

	let products = [
		{
			title: "Mug",
			cost: "$10",
			src: "/path.png",
		},
		{
			title: "Shirt",
			cost: "$20",
			src: "/path.png",
		},
	];

	let updatePrice = () => {
		products[0].cost = "$55";
	};
</script>

<div>
	{#each products as product (product.title)}
		<!-- product propをcomponentに渡す -->
		<ThisIsComponent {product} />
	{/each}
	<button on:click={updatePrice}>update Price</button>
</div>
