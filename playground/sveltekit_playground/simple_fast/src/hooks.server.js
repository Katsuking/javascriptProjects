import { prisma } from "$lib/server/prisma";

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	// get cookies
	const session = event.cookies.get("svelte_session");

	if (!session) return await resolve(event);
	const user = await prisma.user.findUnique({
		where: {
			userAuthToken: session,
		},
		select: { username: true, Role: true },
	});
	console.log(user);

	if (user) {
		// After the user is authenticated and
		// the cookie is created we can populate event.locals.user
		event.locals.user = {
			name: user.username,
			role: user.Role.name,
		};
	}
	// console.log(event.url.pathname);

	const response = await resolve(event);
	return response;
}
