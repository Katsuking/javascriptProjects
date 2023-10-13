//############################################
// How to load data
//############################################
// +page.server.js でのfetchはnativeなfetchになる
//---------------------------------------------

export const load = async () => {
	// get data
	const fetchCart = async () => {
		const res = await fetch("https://dummyjson.com/carts/user/5");
		const CartData = res.json();
		return CartData;
	};

	return {
		products: fetchCart(),
	};
};
