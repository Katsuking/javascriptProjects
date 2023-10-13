import { prisma } from "$lib/server/prisma";
import { error } from "@sveltejs/kit";

//############################################
// ページ遷移 と データ取得
//############################################
// [articleId]/ のようにdynamic routerを使う
// <a href="/use_prisma/{article.id}" role="button">Edit</a>
//---------------------------------------------
/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params }) => {
	const getArticle = async () => {
		const article = await prisma.article.findUnique({
			where: {
				id: Number(params.articleId),
			},
		});
		if (!article) {
			throw error(404, "Article not found");
		}
		return article;
	};

	return {
		article: getArticle(),
	};
};

// 更新
export const actions = {
	updateArticle: async ({ request, params }) => {
		const { title, content } = Object.fromEntries(await request.formData());

		try {
			await prisma.article.update({
				where: {
					id: Number(params.articleId),
				},
				data: {
					title,
					content,
				},
			});
		} catch (err) {
			console.error(err);
			return fail(500, { message: "Could not update article" });
		}

		return {
			status: 200,
		};
	},
};
