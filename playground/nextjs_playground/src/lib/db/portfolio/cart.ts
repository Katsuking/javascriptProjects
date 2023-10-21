import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/db/prisma";
import { Cart, Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { cookies } from "next/dist/client/components/headers";

// prismaを使って、productの型情報も定義する
export type CartWithProduct = Prisma.CartGetPayload<{
  include: { CartItem: { include: { product: true } } };
}>;

// カートの商品情報の型も定義
export type CartItemWithProduct = Prisma.CartItemGetPayload<{
  include: { product: true };
}>;

export type ShoppingCart = CartWithProduct & {
  size: number;
  subtotal: number;
};

// async funcなので、Promiseを返す cookieが存在しない場合はnull
export const getCart = async (): Promise<ShoppingCart | null> => {
  const session = await getServerSession(authOptions);

  let cart: CartWithProduct | null = null;
  if (session) {
    cart = await prisma.cart.findFirst({
      where: { userId: session.user.id },
      include: { CartItem: { include: { product: true } } }, // product 情報も取得
    });
  } else {
    // anonymous cart
    // 下のcreateCartで定義したCookieを使う
    const localCartId = cookies().get("localCartId")?.value;
    cart = localCartId
      ? await prisma.cart.findUnique({
          where: { id: localCartId },
          include: { CartItem: { include: { product: true } } }, // product 情報も取得
        })
      : null;
  }

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
  const session = await getServerSession(authOptions);

  let newcart: Cart;
  if (session) {
    newcart = await prisma.cart.create({
      data: { userId: session.user.id }, // route.ts
    });
  } else {
    // anonymous cart
    newcart = await prisma.cart.create({
      data: {},
    });

    // ユーザーがどのカートに属してるかどうかの判定は、クッキーを使って行う。
    // 本番環境等では、encryptが必要
    cookies().set("localCartId", newcart.id);
  }

  return {
    ...newcart,
    size: 0,
    subtotal: 0,
    CartItem: [], // これがないとTSに怒られる
  };
};
