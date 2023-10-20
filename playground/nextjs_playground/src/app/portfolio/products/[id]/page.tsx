import PriceTag from "@/components/Portfolio/PriceTag";
import prisma from "@/lib/db/prisma";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";
import AddToCartButton from "./AddToCartButton";
import { incrementProductQuantity } from "./actions";

interface ProductPageProps {
  // ここではURLからproduct idを取得したい
  params: {
    id: string;
  };
}

// ちなみにfetchをつかって、APIからもってくるとかだと勝手にcacheしてくれるけど、
// prismaとかaxiosとか使うなら手動でcacheの設定が必要
// これを呼び出す関数では、一度のみ処理が実行されるだけになる
const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });
  if (!product) notFound(); // redirect to not found page
  return product;
});

export const generateMetadata = async ({
  params: { id },
}: ProductPageProps): Promise<Metadata> => {
  const product = await getProduct(id);

  return {
    title: product.name + "-- item",
    description: product.description,
    openGraph: {
      // リンク共有したときの画像
      images: [{ url: product.imageUrl }],
    },
  };
};

// 受け取った idから商品情報を取得
export default async function ProductPage({
  params: { id },
}: ProductPageProps) {
  const product = await getProduct(id);

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={500}
        height={500}
        priority
      />
      <div className="p-2">
        <h1 className="text-5xl font-bold">{product.name}</h1>
        <PriceTag price={product.price} className="mt-4" />
        <p className="py-6">{product.description}</p>
        <AddToCartButton
          productId={product.id}
          incrementProductQuantity={incrementProductQuantity}
        />
      </div>
    </div>
  );
}
