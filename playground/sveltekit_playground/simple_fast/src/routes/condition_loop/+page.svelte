<script>
	import { fade } from "svelte/transition";

	// ランダムな文字列の生成
	// まじでユニークではないけど、一番簡単そうだった
	let uniqueId = () =>
		Date.now().toString(36) + Math.random().toString(36).substring(2);

	let product = {
		name: "t-shirt",
		quantity: 0,
	};

	function increment() {
		product.quantity = ++product.quantity;
	}

	$: products = [
		{ name: "t-shirt", quantity: 10, id: uniqueId() },
		{ name: "mug", quantity: 30, id: uniqueId() },
		{ name: "sticker", quantity: 8, id: uniqueId() },
		{ name: "sweatshirt", quantity: 12, id: uniqueId() },
	];

	let status_itemadd = false;
	function addProduct() {
		let cup = { name: "cup", quantity: 12, id: uniqueId() };
		products = [cup, ...products];
		status_itemadd = true;
	}
	function removeProduct() {
		products = products.filter((el) => el.name !== "cup");
		status_itemadd = false;
	}
</script>

<div>
	<a href="/">home</a>
</div>

<div class="div1">
	<h1>if else</h1>
	<p>jsx よりシンプルに分岐がかける</p>
	{#if product.quantity > 3}
		<h2>Product: {product.name} is in stock</h2>
	{:else if product.quantity === 0}
		<h2>Product: {product.name} is out of stock</h2>
	{:else}
		<h2>Only a few {product.name} is left stock</h2>
	{/if}
	<button
		on:click={increment}
		class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
		>produce item</button
	>
	<div>Current {product.name} quantity: {product.quantity}</div>
</div>

<div class="div2">
	<h1>loop</h1>
	<input type="checkbox" bind:checked={status_itemadd} />
	<button on:click={addProduct}>add cup (item) to Products</button>
	<button on:click={removeProduct}>remove all cup from Products</button>
	{#each products as product, i (product.id)}
		<!-- おまけでsvelte組み込みのtransitionつけてみた out:fadeでもいいかんじ-->
		<p transition:fade={{ delay: 200, duration: 500 }}>
			item number{i + 1}: {product.name}
		</p>
	{/each}
</div>

<style>
	.div1 {
		background-color: #8692a3;
		margin: 10px;
		padding: 10px;
	}

	.div2 {
		background-color: #618bc9;
		margin: 10px;
		padding: 10px;
	}
</style>
