// map 普通のループ
const array_for_map = [1, 2, 3, 4, 5];
const new_array_for_map = array_for_map.map((el) => el * el); // [ 1, 4, 9, 16, 25 ]
// この書き方は上と同じ
const new_array_for_map_aint_right = array_for_map.map((el) => {
  return el * el;
}); // [ 1, 4, 9, 16, 25 ]
console.log(new_array_for_map);
console.log(new_array_for_map_aint_right);
