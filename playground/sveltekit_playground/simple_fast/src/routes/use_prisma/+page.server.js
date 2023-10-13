// https://kit.svelte.dev/docs/form-actions

import { prisma } from "$lib/server/prisma";
import { fail } from "@sveltejs/kit";

//############################################
// db からデータ取得
//############################################
// kitload for shortcut
//---------------------------------------------

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	return {
		articles: await prisma.article.findMany(),
	};
}

//############################################
// db への書き込み
//############################################
// $lib/server/prisma.ts
// type kitActions for shortcut
//---------------------------------------------

/** @type {import('./$types').Actions} */
export const actions = {
	// add
	createArticle: async ({ request }) => {
		const { title, content } = Object.fromEntries(await request.formData());

		try {
			await prisma.article.create({
				data: {
					title,
					content,
				},
			});
		} catch (error) {
			console.error(error);
			return fail(500, { message: "Could not create the article." });
		}

		return {
			status: 201,
		};
	},

	// delete
	deleteArticle: async ({ url }) => {
		const id = url.searchParams.get("id");

		if (!id) {
			return fail(400, { message: "Invalid ID" });
		}

		try {
			await prisma.article.delete({
				where: {
					id: Number(id),
				},
			});
		} catch (error) {
			console.error(error);
			return fail(500, { message: "something went wrong..." });
		}

		return {
			status: 200,
		};
	},
};
