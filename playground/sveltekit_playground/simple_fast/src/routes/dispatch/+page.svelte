<script>
	import ChildDispatch from "$lib/child_dispatch.svelte";

	function handleChildClick(event) {
		alert(event.detail.message);
	}
</script>

<!-- dispatch("message", { message: "Hello from child" }); -->
<!-- のようにcomponentで定義したように, messageがイベント名 -->
<!-- ここでは、messageイベントを監視 -->
<ChildDispatch on:message={handleChildClick} />
