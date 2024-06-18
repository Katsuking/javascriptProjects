// custom error を作成してみる
// https://stackoverflow.com/questions/41102060/typescript-extending-error-class
export class DatabaseError extends Error {
  constructor() {
    super('DB Error');
    // 自作エラーを作る際のおまじない
    Object.setPrototypeOf(this, DatabaseError.prototype); // restore prototype chain
  }
}
