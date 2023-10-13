<script>
	let quantity = 0;
	let inventory = [];
	function addCart() {
		if (remaining_right_way > 0) {
			quantity = ++quantity;
			inventory.push(quantity);
			// Array.push method in JS actually mutates an existing array,
			// but it leaves the overall Array object iteself unchanged.
			// To actually re-render our app we need to make sure to always use the assignment operation
			inventory = inventory;
		}
	}

	// Objectの更新
	let user = { name: "Jones" };
	function updateUsername() {
		user.name = "Tay Keith";
	}

	// Reactive declaration
	let remaining_wrong_way = 10 - quantity; // this is wrong
	$: remaining_right_way = 10 - quantity; // good

	let price = 5;
	$: totalcost = quantity * price;

	// on:derective
	function handleClick(string) {
		alert(string);
	}

	let searchedValue = "";
	function setSearchValue() {
		searchedValue = document.getElementById("myText").value;
	}

	let check = false;
	let name = "";
</script>

<div class="div1">
	<!-- useState的なやつ -->
	<h2>on:click</h2>
	<div>your shopping cart has {quantity} items</div>
	<div>{inventory}</div>
	<button
		on:click={addCart}
		class="my-2 text-white rounded-lg bg-green-400 px-4 hover:bg-green-500 focus:outline-none focus:ring focus:ring-offset-green-300 active:bg-green-900"
		>Add to cart</button
	>

	<!-- objectの更新 -->
	<div>{user.name}</div>
	<button
		on:click={updateUsername}
		class="my-2 text-white rounded-lg bg-green-400 px-4 hover:bg-green-500 focus:outline-none focus:ring focus:ring-offset-green-300 active:bg-green-900"
		>change name</button
	>

	<!-- Reactive Reclaration -->
	<div>
		Remaining inventory: {remaining_wrong_way} (this value will not change)
	</div>
	<div>Remaining inventory: {remaining_right_way}</div>

	<div>total cost: {totalcost}</div>
</div>

<button on:click={() => handleClick("this button is handled")}
	>handle button event</button
>

<!-- | modifier について
https://svelte.dev/docs/element-directives -->

<!-- |self できちんと対象の範囲がクリックされたときのみ、処理が動くようにする -->

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="greenDiv"
	on:click|self={() => handleClick("click button is pushed now")}
>
	you can click green
	<div class="redDiv">You can not click Red</div>
</div>

<!-- mousemove -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="greenDiv"
	on:mousemove|self={() => handleClick("click button is pushed now")}
>
	you can move your mouse here to activate
	<div class="redDiv">Not here</div>
</div>

<div class="div2">
	<h2>bind: derective</h2>
	<!-- bind:drective -->
	<!-- send data from child to parent -->
	<div>search words: {searchedValue}</div>
	<input type="text" on:keyup={setSearchValue} id="myText" value="" />

	<!-- bindを使うことでもっとシンプルに実現できる -->
	<div>bind search words: {searchedValue}</div>
	<input type="text" bind:value={searchedValue} />

	<p>{check}</p>
	<p>{name}</p>

	<input type="text" bind:value={name} />
	<input type="checkbox" bind:checked={check} />
</div>

<style>
	.greenDiv {
		background-color: greenyellow;
		padding: 20px;
		margin: 10px;
	}

	.redDiv {
		background: orangered;
		padding: 20px;
	}

	.div1 {
		background-color: #8692a3;
		margin: 10px;
		padding: 10px;
	}

	.div2 {
		background-color: #618bc9;
		margin: 10px;
		padding: 10px;
	}
</style>
