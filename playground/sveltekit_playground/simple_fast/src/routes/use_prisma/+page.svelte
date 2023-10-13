<script>
	export let data;

	$: ({ articles } = data);

	/** @type {import('./$types').PageServerLoad} */
	// export async function load() {
	// 	return {
	// 		articles: await prisma.article.findMany(),
	// 	};
	// }
</script>

<form action="?/createArticle" method="POST" class="p-3">
	<h3 class="text-xl font-semibold mb-4">Add Article</h3>
	<div class="mb-4">
		<label for="title" class="block text-gray-700 text-sm font-bold mb-2"
			>Title</label
		>
		<input
			type="text"
			id="title"
			name="title"
			class="border rounded-lg py-2 px-3 w-full focus:outline-none focus:border-blue-400"
		/>
	</div>
	<div class="mb-6">
		<label for="content" class="block text-gray-700 text-sm font-bold mb-2"
			>Content</label
		>
		<textarea
			name="content"
			id="content"
			cols="30"
			rows="10"
			class="border rounded-lg py-2 px-3 w-full h-40 focus:outline-none focus:border-blue-400"
		/>
	</div>
	<div>
		<button
			type="submit"
			class="bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
			>Add</button
		>
	</div>
</form>

{#each articles as article (article.id)}
	<h3>{article.id}: {article.title}</h3>
	<p>{article.content}</p>
	<form action="?/deleteArticle&id={article.id}" method="post">
		<button type="submit">delete</button>
	</form>
	<a href="/use_prisma/{article.id}" role="button">Edit</a>
{/each}
