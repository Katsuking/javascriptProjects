import { prisma } from "$lib/server/prisma.ts";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const limit = 3;

	const page = Number(params.pagination_prisma);

	async function getArticle() {
		const articles = await prisma.article.findMany({
			skip: (page - 1) * limit,
			take: limit,
		});
		return articles;
	}

	async function getArticleCount() {
		return await prisma.article.count();
	}

	return {
		Article: getArticle(),
		totalArticle: getArticleCount(),
		pageSize: limit,
	};
}
