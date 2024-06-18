// custom error を作成してみる
// https://stackoverflow.com/questions/41102060/typescript-extending-error-class
export class AuthenticationError extends Error {
  constructor(public msg: string) {
    super(msg);
    // 自作エラーを作る際のおまじない
    Object.setPrototypeOf(this, AuthenticationError.prototype); // restore prototype chain
  }
}
