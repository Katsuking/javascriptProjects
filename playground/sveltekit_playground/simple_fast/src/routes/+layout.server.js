import { redirect } from "@sveltejs/kit";

// https://kit.svelte.dev/docs/load#layout-data

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ locals, url }) {
	// protected routes
	if (url.pathname.startsWith("/basic")) {
		if (!locals.user) {
			console.log("access denied");
			throw redirect(303, "/");
		}
	}

	// console.log("+layout.server.js =>", locals);
	return {
		user: locals.user,
	};
}
