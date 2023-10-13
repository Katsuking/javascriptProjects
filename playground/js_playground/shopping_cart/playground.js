// node test.js

//############################################
// ランダムな文字列の生成
//############################################
// 36進法を使う書き方が
// ぐぐって一番簡単そうだった
//---------------------------------------------

let uniqueId = Date.now().toString(36) + Math.random().toString(36).substring(2);

console.log(Date.now()); // 1691301367853
console.log(Date.now().toString(10)); // 1691301616614
console.log(Date.now().toString(36)); // lkz16t0g

console.log(Math.random()); // 0.6036844350940209
console.log(Math.random().toString(36)); // 0.3pvbid4xsk5
console.log(Math.random().toString(36).substring(2)); // i02iaw6me1

console.log(uniqueId); // lkz16t0dn4dkkr114f

// ternary expressionを使ったらシンプルにかけたりする
let total = 0;
let checker = 5;

total = checker > 3 ? "greater than 3" : "less than 3";
console.log(total);


