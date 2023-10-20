"use server";

import { createcart, getCart } from "@/lib/db/cart";
import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export const incrementProductQuantity = async (productId: string) => {
  // cart用のdb操作は、別ファイルcart.tsに記載
  const cart = (await getCart()) ?? (await createcart()); // 左がnull / undefinedのとき左を返す

  const articleInCart = cart.CartItem.find(
    (item) => item.productId === productId,
  );
  if (articleInCart) {
    await prisma.cartItem.update({
      where: { id: articleInCart.id },
      data: { quantity: { increment: 1 } }, // ++quantity
    });
  } else {
    // cart が存在しない場合
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity: 1,
      },
    });
  }
  // refresh page
  revalidatePath("/Portfolio/products/[id]");
};
