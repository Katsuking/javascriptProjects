import { fail, redirect } from "@sveltejs/kit";
import bcrypt from "bcrypt";
import { prisma } from "$lib/server/prisma";

//############################################
// 遷移
//############################################
// cookies(locals)の中身をみて、遷移
// src/routes/authentication/login/+page.server.js => loginユーザーのAuth, クッキーの設定
// src/routes/+layout.server.js => routes以下(すべて)でcookiesからuser情報を取得
// src/routes/+layout.svelte => $page.data.user情報を使って、表示内容を変化
//---------------------------------------------

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	if (locals.user) throw redirect(302, "/");
}

//############################################
// ユーザーのログイン処理
//############################################
// Actionsを使って、form情報を取得
// validation
// userの存在確認
// userAutheTokenの更新
// cookiesのセット
// redirect
//---------------------------------------------

/** @type {import('./$types').Actions} */
export const actions = {
	login: async ({ cookies, request }) => {
		const { username, password } = Object.fromEntries(await request.formData());

		// validation
		if (
			typeof username != "string" ||
			typeof password != "string" ||
			!username ||
			!password
		) {
			return fail(400, { invalid: true });
		}

		// user check
		const user = await prisma.user.findUnique({
			where: {
				username,
			},
		});
		if (!user) return fail(400, { credential: true });

		console.log(user);

		const userPassword = await bcrypt.compare(password, user.passwordHash);
		// console.log(userPassword);
		if (!userPassword) return fail(400, { credential: true });

		// Update userAuthToken
		const authenticatedUser = await prisma.user.update({
			where: { username: user.username },
			data: {
				userAuthToken: crypto.randomUUID(),
			},
		});

		cookies.set("svelte_session", authenticatedUser.userAuthToken, {
			path: "/", // send cookie for every page
			sameSite: true,
			httpOnly: true, // allow requests from the same site
			secure: process.env.NODE_ENV === "production", // only allow https in production
			// set cookie to expire after a day
			maxAge: 60 * 60 * 24,
		});

		throw redirect(302, "/");
	},
};
