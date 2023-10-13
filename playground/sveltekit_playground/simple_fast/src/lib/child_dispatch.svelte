<script>
	import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();

	function handleClick() {
		dispatch("message", { message: "Hello from child" });
	}
</script>

<button on:click={handleClick}>Click me from child_dispatch</button>
