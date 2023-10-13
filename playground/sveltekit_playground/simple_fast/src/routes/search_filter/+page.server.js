/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const getProducts = async () => {
		const res = await fetch("https://dummyjson.com/products");
		const data = await res.json();
		// console.log(data.products);
		return data.products;
	};

	return {
		products: getProducts(),
	};
}
