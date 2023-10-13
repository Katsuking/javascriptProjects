import { redirect, fail } from "@sveltejs/kit";
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
// Actions + validation
//############################################
// formの入力を受け取る
// validation
//---------------------------------------------

/** @type {import('./$types').Actions} */
export const actions = {
	// createUser
	register: async ({ request }) => {
		const { username, password } = Object.fromEntries(await request.formData());
		// console.log(username, password);

		// validation
		if (
			typeof username != "string" ||
			typeof password != "string" ||
			!username ||
			!password
		) {
			return fail(400, { message: "Invalid username or password" });
		}

		// user check
		const user = await prisma.user.findUnique({
			where: {
				username,
			},
		});
		// console.log(user);
		if (user) return fail(400, { user: true });

		// create new user
		try {
			await prisma.user.create({
				data: {
					username,
					passwordHash: await bcrypt.hash(password, 8),
					userAuthToken: crypto.randomUUID(),
					Role: { connect: { name: "USER" } }, // defaultでroleはADMINではなくて、USER
				},
			});
		} catch (error) {
			console.error(error);
			return fail(400, { message: "could not create new user..." });
		}

		throw redirect(303, "/authentication/login");
	},
};
