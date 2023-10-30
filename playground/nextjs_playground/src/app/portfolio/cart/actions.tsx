"use server";

import { createcart, getCart } from "@/lib/db/portfolio/cart";
import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

const setProductQuantity = async (productId: string, quantity: number) => {
  const cart = (await getCart()) ?? (await createcart()); // 左がnull / undefinedのとき左を返す

  const articleInCart = cart.CartItem.find(
    (item) => item.productId === productId,
  );

  if (quantity === 0) {
    if (articleInCart) {
      await prisma.cartItem.delete({
        where: { id: articleInCart.id },
      });
    }
  } else {
    if (articleInCart) {
      await prisma.cartItem.update({
        where: { id: articleInCart.id },
        data: { quantity },
      });
    } else {
      // cartが存在しない場合は新規に作成
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity, // 受け取ったquantityをそのまま使う
        },
      });
    }
  }

  // refresh and fetch new data
  revalidatePath("/portfolio/cart");
};

export default setProductQuantity;
