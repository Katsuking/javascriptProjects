import { error } from "@sveltejs/kit";

/** @type {import('./$types').PageLoad} */
export async function load({ url, fetch }) {
	const limit = Number(url.searchParams.get("limit")) || 10;
	const skip = Number(url.searchParams.get("skip")) || 0;

	const getUsers = async (limit = 10, skip = 0) => {
		if (limit > 400) {
			throw error(400, "Bad Request");
		}

		const res = await fetch(
			`https://dummyjson.com/users?limit=${limit}&skip=${skip}`
		);
		const data = await res.json();
		return data;
	};

	return {
		users: getUsers(limit, skip),
	};
}
