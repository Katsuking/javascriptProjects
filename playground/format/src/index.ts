export const formatDate = (value: string): string | undefined => {
  if (value.match('^[0-9/]+$')) {
    const patternCheck = [
      { dt: 'ymd', ptn: '^([0-9]{4})/([0-9]{2})/([0-9]{2})$' }, // yyyy/MM/dd
      { dt: 'ymd', ptn: '^([0-9]{2})/([0-9]{2})/([0-9]{2})$' }, // yy/MM/dd
      { dt: 'ymd', ptn: '^([0-9]{4})([0-9]{2})([0-9]{2})$' }, // yyyyMMdd
      { dt: 'ymd', ptn: '^([0-9]{2})([0-9]{2})([0-9]{2})$' }, // yyMMdd
    ];
    const check = patternCheck.filter((v) => value.match(v.ptn)); // 正規表現に該当する要素の取得
    console.log('check(filter):', check);
    if (check.length > 0) {
      const m = value.match(check[0].ptn);
      console.log('m:', m);
      if (m) {
        m[1] = ('20' + m[1]).slice(-4);
        console.log('m[1]:', m[1]);
        const n = m.map((v) => parseInt(v, 10));
        const dtcheck = new Date(n[1], n[2] - 1, n[3]);
        if (dtcheck instanceof Date && !isNaN(dtcheck.getTime())) {
          if (n[2] - 1 === dtcheck.getMonth() && n[3] === dtcheck.getDate()) {
            return m[1] + '/' + m[2] + '/' + m[3];
          }
        }
      }
    }
  }
  return undefined;
};

const dateString = '2024/10/10'; // 値を変えてみる
const formattedDate = formatDate(dateString);

if (formattedDate) {
  console.log(`success! ${formattedDate}`);
} else {
  console.log(`failed! ${formattedDate}`);
}
