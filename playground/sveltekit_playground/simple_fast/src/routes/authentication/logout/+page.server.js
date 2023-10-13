import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	throw redirect(302, "/");
}

/** @type {import('./$types').Actions} */
export const actions = {
	default({ cookies }) {
		cookies.delete("svelte_session", { path: "/" });

		throw redirect(302, "/authentication/login");
	},
};
