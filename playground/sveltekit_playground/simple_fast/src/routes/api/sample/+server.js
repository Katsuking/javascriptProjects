import { SECRET_KEY_API } from "$env/static/private"; // read from .env

export const GET = async ({ request }) => {
	const authHeader = request.headers.get("Authorization");
	console.log(authHeader);
	console.log(SECRET_KEY_API);

	if (authHeader !== "myAuth") {
		return new Response(
			JSON.stringify({ message: "invalid credential" }, { status: 401 })
		);
	}
	return new Response(JSON.stringify({ Message: "Hello world" }), {
		status: 200,
	});
};
