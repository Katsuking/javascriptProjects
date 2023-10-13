//############################################
// How to load data
//############################################
// svelteのfetchでclientとserverのやり取りを行ってくれる
// 内部的には色々違うけど、記述は nativeのfetchと同じ
// https://kit.svelte.dev/docs/web-standards#fetch-apis

// 複数のsrcから取得する際に、waterfallを作らないようにする
// F5 -> F12 -> Dev tool -> Network -> Fetch/XHRで確認
//---------------------------------------------

export const load = async ({ fetch }) => {
	const fetchProducts = async () => {
		const ProductRes = await fetch(
			"https://dummyjson.com/products?limit=10&skip=10"
		);
		const ProductData = await ProductRes.json();
		return ProductData.products;
	};

	const fetchUsers = async () => {
		const UsersRes = await fetch("https://dummyjson.com/users");
		const UsersData = await UsersRes.json();
		return UsersData.users;
	};

	return {
		products: fetchProducts(),
		users: fetchUsers(),
	};
};
