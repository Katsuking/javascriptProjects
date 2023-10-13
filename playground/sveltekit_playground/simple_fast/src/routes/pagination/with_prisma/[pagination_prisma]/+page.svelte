<script>
	import { page } from "$app/stores";

	export let data;

	let pageSize = data.pageSize;
	$: totalItems = data.totalArticle;
	$: totalPages = Math.ceil(totalItems / pageSize);
	$: currentPage = Number($page.params.pagination_prisma) - 1; // with_prisma/[pagination_prisma]
</script>

<div class="p-5">
	total page: {totalPages}
	total items: {totalItems}
	current page: {currentPage}
</div>

{JSON.stringify(data)}

<div class="p-5 grid grid-cols-1">
	{#each data.Article as article, index}
		<p class=" text-purple-500">{article.title}</p>
	{/each}
</div>

<div>
	{#each Array(totalPages) as _, i}
		<a
			href="/pagination/with_prisma/{i + 1}"
			class={currentPage === i ? "text-emerald-500" : ""}
		>
			{i + 1}
		</a>
	{/each}
</div>
