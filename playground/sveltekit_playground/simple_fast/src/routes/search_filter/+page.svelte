<script>
	//############################################
	// 検索機能
	//############################################
	// https://learn.svelte.jp/tutorial/writable-stores
	// store を使用して、コンポーネント階層に関係なく、
	// アクセスできるようにする
	//
	//---------------------------------------------

	import { createSearchStore, searchHandler } from "$lib/stores/search.js"; // store
	import { onDestroy } from "svelte";
	export let data;

	const searchProducts = data.products.map((product) => ({
		...product,
		// 検索対象として、新たに追加
		searchParams: `${product.title.toLowerCase()} ${
			product.price
		} ${product.brand.toLowerCase()} ${product.category.toLowerCase()}`,
	}));

	const searchStore = createSearchStore(searchProducts);
	// 書き込み可能なstoreを返す関数
	// 	export const createSearchStore = (data) => {
	// 	const { subscribe, set, update } = writable({
	// 		data: data,
	// 		filtered: data,
	// 		search: "",
	// 	});

	// 	return {
	// 		subscribe,
	// 		set,
	// 		update,
	// 	};
	// };

	const unsubscribe = searchStore.subscribe((model) => searchHandler(model));
	// {
	// 	data: data,
	// 	filtered: data,
	// 	search: "",
	// } に変更があるたびに
	// コールバック内で下記の処理が発火する
	// 	export const searchHandler = (store) => {
	// 	const searchTerm = store.search.toLowerCase() || "";
	// 	store.filtered = store.data.filter((item) => {
	// 		return item.searchParams.includes(searchTerm);
	// 	});
	// };

	onDestroy(() => {
		unsubscribe();
	});
</script>

<a href="/" class="p-3">home</a>

<div class="flex flex-col items-center pt-3">
	<h1>Search</h1>
	<input
		class="ring ring-slate-950 p-1"
		type="search"
		placeholder="search..."
		bind:value={$searchStore.search}
	/>
</div>

<!-- <pre>{JSON.stringify($searchStore.filtered, null, 2)}</pre> -->

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
	{#each $searchStore.filtered as product (product.id)}
		<div class="p-3">
			<h2 class=" text-center">{product.title}</h2>
			<p>{product.description}</p>
		</div>
	{/each}
</div>
