// IntersectionObserver でスクロール時に合わせた
// 要素の遅延読み込み等やアニメーションのトリガー
// IntersectionObserverは、コンストラクタを介してインスタンスを作成し、
// コールバック関数を指定して使用します。
// コールバック関数は、監視対象の要素と交差した際に呼び出されます。
// このコールバック関数には、交差した要素や交差情報が渡されます。

const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		console.log(entry);
		// 要素がビューポート内に表示されたときの処理
		if (entry.isIntersecting) {
			entry.target.classList.add("show");
		} else {
			entry.target.classList.remove("show");
		}
	});
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));
