// デフォルトでSSRになっているため、
// DB操作もできる

import ProductCart from "@/components/Portfolio/Cart/ProductCart";
import PaginationBar from "@/components/Portfolio/PaginationBar";
import prisma from "@/lib/db/prisma";
import Image from "next/image";
import Link from "next/link";

interface PortfolioProps {
  // urlからparamsを取得する時は必ずこれ
  searchParams: { page: string }; // from PaginationBar
}

export default async function PortofioPage({
  searchParams: { page = "1" },
}: PortfolioProps) {
  // url paramsであるpageが文字列なので、numberに
  const currentPage = parseInt(page);
  const pageSize = 6;
  const hereItemCount = 1;

  // dbから商品の個数を取得
  const totalItemCount = await prisma.product.count();

  // 全体のページ数を計算
  const totalPages = Math.ceil((totalItemCount - hereItemCount) / pageSize);

  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
    // pagination のためにskipを追加
    skip:
      (currentPage - 1) * pageSize + (currentPage === 1 ? 0 : hereItemCount),
    take: pageSize + (currentPage === 1 ? hereItemCount : 0),
  });

  return (
    <div className="flex flex-col items-center">
      {/* <ProductCart product={products[0]} /> */}
      {currentPage === 1 && (
        <div className="hero rounded-xl bg-base-200">
          <div className="hero-content flex-col lg:flex-row">
            <Image
              src={products[0].imageUrl}
              alt={products[0].name}
              width={400}
              height={800}
              className="w-full max-w-sm rounded-lg shadow-2xl"
              priority
            />
            <div>
              <h1 className="text-5xl font-bold">{products[0].name}</h1>
              <p className="py-6">{products[0].description}</p>
              <Link
                href={"/portfolio/products/" + products[0].id}
                className="btn-primary btn"
              >
                check this out
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {/* ややこしいけど、map()の対象を条件分け */}
        {(currentPage === 1 ? products.slice(1) : products).map((product) => (
          <ProductCart product={product} key={product.id} />
        ))}
      </div>
      {/* <PaginationBar currentPage={25} totalPages={99} /> */}
      {totalPages > 1 && (
        <PaginationBar currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  );
}
