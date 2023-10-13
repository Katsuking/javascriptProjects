import { SECRET_KEY_API } from "$env/static/private"; // read from .env

//############################################
// GET
//############################################
// 超簡単なAPIの作成方法
// Postman より vscode Thunder clientがおすすめ
// ここで確認できること:
//      .envから環境変数の取得
//      超簡単なAuth
//      request urlからquery parametersの取得
//      後は、statusやbodyの返し方等々
//---------------------------------------------

export const GET = async ({ request, url }) => {
	const authHeader = request.headers.get("Authorization");
	console.log(authHeader);
	console.log(SECRET_KEY_API);

	if (authHeader !== "myAuth") {
		return new Response(
			JSON.stringify({ message: "invalid credential" }, { status: 401 })
		);
	}

	// Query parameters
	const limit = Number(url.searchParams.get("limit") ?? "10");
	const skip = Number(url.searchParams.get("skip") ?? "0");

	// Fetch data from API or DB
	const res = await fetch(
		`https://dummyjson.com/products?limit=${limit}&skip=${skip}`
	);
	const data = await res.json();

	return new Response(JSON.stringify(data), { status: 200 });
};

//############################################
// POST
//############################################
// postの受け取り確認
// {
//      "title": "uuuge",
//      "name": "Jonny"
// }
// ここで確認できること:
//      .envから環境変数の取得
//      超簡単なAuth
//      request urlからquery parametersの取得
//      後は、statusやbodyの返し方等々
//---------------------------------------------

export const POST = async ({ request }) => {
	const body = await request.json();
	console.log(body);

	return new Response(JSON.stringify({ message: "Success" }), { status: 201 });
};
