import prisma from "@/lib/db/prisma";
import { Cart, Prisma } from "@prisma/client";
import { cookies } from "next/dist/client/components/headers";

// prismaを使って、productの型情報も定義する
export type CartWithProduct = Prisma.CartGetPayload<{
  include: { CartItem: { include: { product: true } } };
}>;

export type ShoppingCart = CartWithProduct & {
  size: number;
  subtotal: number;
};

// async funcなので、Promiseを返す cookieが存在しない場合はnull
export const getCart = async (): Promise<ShoppingCart | null> => {
  // 下のcreateCartで定義したCookieを使う
  const localCartId = cookies().get("localCartId")?.value;
  const cart = localCartId
    ? await prisma.cart.findUnique({
        where: { id: localCartId },
        include: { CartItem: { include: { product: true } } }, // product 情報も取得
      })
    : null;

  if (!cart) return null;

  // ただcartを返すだけじゃない
  return {
    ...cart,
    size: cart.CartItem.reduce((acc, item) => acc + item.quantity, 0), // cartの中のトータル
    subtotal: cart.CartItem.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0,
    ),
  };
};

export const createcart = async (): Promise<ShoppingCart> => {
  const newcart = await prisma.cart.create({
    data: {},
  });
  // ユーザーがどのカートに属してるかどうかの判定は、クッキーを使って行う。
  // 本番環境等では、encryptが必要
  cookies().set("localCartId", newcart.id);

  return {
    ...newcart,
    size: 0,
    subtotal: 0,
    CartItem: [], // これがないとTSに怒られる
  };
};
