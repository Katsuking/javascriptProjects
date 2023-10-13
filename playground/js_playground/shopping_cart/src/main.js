//############################################
// ランダムな文字列の生成
//############################################
// まじでユニークではないけど、一番簡単そうだった
//---------------------------------------------

let uniqueId = () =>
	Date.now().toString(36) + Math.random().toString(36).substring(2);

//############################################
// 展開用データ
//############################################
// prismaとかAPIからとってくるけど、
// わかりやすいようにハードコーディング
//---------------------------------------------

let shopItemsData = [
	{
		id: uniqueId(),
		name: "Casual shirt",
		price: 45,
		desc: "this is the sample text",
		img: "../images/img-1.jpg",
	},
	{
		id: uniqueId(),
		name: "Casual shirt",
		price: 120,
		desc: "Lorem7",
		img: "../images/img-2.jpg",
	},
	{
		id: uniqueId(),
		name: "Casual shirt",
		price: 45,
		desc: "Lorem7",
		img: "../images/img-3.jpg",
	},
	{
		id: uniqueId(),
		name: "Mens suits",
		price: 300,
		desc: "Lorem7",
		img: "../images/img-4.jpg",
	},
];

//############################################
// 買い物かご
//############################################
// どのcardの+-を押した際にも、
// idと個数のオブジェクトを更新する
//---------------------------------------------

let basket = [];

//############################################
// カード生成
//############################################
// 説明
//---------------------------------------------

let shop = document.getElementById("shop");

let generateShop = () => {
	return (shop.innerHTML = shopItemsData
		.map((item) => {
			return `
        <div class="item">
        <img width="220" height="200" src=${item.img} alt="">
        <div class="details">
            <h3>${item.name}</h3>
            <p>${item.desc}</p>
            <div class="price-quantity">
                <h2>$ ${item.price}</h2>
                <div class="buttons">
                    <i onclick="decrement(${item.id})" class="bi bi-dash"></i>
                    <div id=${item.id} class="quantity">0</div>
                    <i onclick="increment(${item.id})" class="bi bi-plus-lg"></i>
                </div>
            </div>
        </div>
    </div>`;
		})
		.join(""));
};

generateShop();

//############################################
// Increment Button
//############################################
// 上記カード生成のiconで引数を受け取って、
// onclickで発火
//---------------------------------------------

let increment = (id) => {
	console.log(id.id);
	// basket オブジェクトの要素を回して、条件にオブジェクトを返す
	// ない場合は、undefined
	let search = basket.find((el) => el.id === id.id);
	console.log(search);

	if (search === undefined) {
		// id.idがbasket内に存在しない場合
		basket.push({
			id: id.id,
			item: 1,
		});
	} else {
		search.item += 1;
	}
	console.log(basket);
	update(id.id);
};

//############################################
// Decrement Button
//############################################
// 上記カード生成のiconで引数を受け取って、
// onclickで発火
// 要素のitem(個数)が1のときに、削除ボタンを
// 押した場合は、要素ごと配列から削除する
// それ以外は、個数のみ減らす
//---------------------------------------------

let decrement = (id) => {
	console.log(id.id);

	// マッチするオブジェクトの取得
	let search = basket.find((el) => el.id === id.id);
	if (search === undefined) return;

	if (search.item == 1) {
		// id.idが該当する要素以外を配列にして、書き換える
		basket = basket.filter((el) => el.id !== id.id);
	} else if (search.item >= 2) {
		search.item -= 1;
	} else {
		return;
	}

	console.log(basket);
	update(id.id);
};

//############################################
// cardごとの商品個数を更新
//############################################
// 上記カード生成のiconで引数を受け取って、
// onclickで発火 (increment, decrement両方)
// basketオブジェクト内にない => undefinedのときは、
// 0に設定する。それ以外では、basket.item(個数)を表示
//---------------------------------------------

let update = (id) => {
	let search = basket.find((el) => el.id === id);
	// console.log(search);
	if (search == undefined) {
		document.getElementById(id).innerHTML = 0;
	} else {
		document.getElementById(id).innerHTML = search.item;
	}
	calculate();
};

//############################################
// 合算したカートのアイテム
//############################################
// 右上のカート内のアイテムの数と
// 各カードの個数を連動させる
// +- のbuttonが押されるたびに合計値の更新
//---------------------------------------------

let calculate = () => {
	let total = 0;

	if (basket.length == 0) {
		document.getElementById("cartAmount").innerHTML = 0;
		return;
	}

	// if basket array is not empty, get the total of items
	basket.map((el) => {
		total += el.item;
	});
	document.getElementById("cartAmount").innerHTML = total;

	// here is another way to do this
	console.log("reduce()を使った場合");
	console.log(basket.map((el) => el.item).reduce((x, y) => x + y, 0));
};
