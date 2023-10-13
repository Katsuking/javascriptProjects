<script>
	import { page } from "$app/stores"; // to use searchPrams

	// current page we are on
	$: currentPage = (Number($page.url.searchParams.get("skip")) || 0) / pageSize;

	export let data;
	let pageSize = 10;
	// https://dummyjson.com/docs/users
	$: totalItems = data.users.total;
	$: totalPages = Math.ceil(totalItems / pageSize);
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-5">
	<a href="/">home</a>
	<a href="/pagination/with_prisma">what if you do the same thing with prisma</a
	>
</div>

<h1 class="text-center py-5">Users</h1>

<!-- {JSON.stringify(data.users.users)} -->

<div class="p-5">
	{#each data.users.users as user}
		<p>{user.email}</p>
	{/each}
</div>

<div class="p-5">
	<!-- 使用するのは, indexのみ -->
	{#each Array(totalPages) as _, index}
		<a
			href="/pagination?limit={pageSize}&skip={pageSize * index}"
			class={currentPage === index ? "text-emerald-500" : ""}
		>
			{index + 1}
		</a>
	{/each}
</div>
