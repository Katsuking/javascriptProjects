import { DefaultSession } from "next-auth";

// 型でTSに怒られるので、ここでsessionのuser型を修正する
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"]; // defaultの型を追加しないと idしか型を持たなくなる
  }
}
