import prisma from "@/lib/db/prisma";
import ProductCard from "../../../components/Portfolio/Cart/ProductCart";
import { Metadata } from "next";

interface SearchPageProps {
  searchParams: { query: string };
}

// 動的にタイトルを更新
export function generateMetadata({
  searchParams: { query },
}: SearchPageProps): Metadata {
  return {
    title: `Search ${query} - myshop`,
  };
}

export default async function SearchPage({
  searchParams: { query },
}: SearchPageProps) {
  // search paaramからDB取得
  const products = await prisma.product.findMany({
    where: {
      OR: [
        {
          name: { contains: query },
          description: { contains: query },
        },
      ],
    },
    orderBy: { id: "desc" },
  });

  if (products.length === 0) {
    return <div className="text-center">No product found</div>;
  } else {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    );
  }
}
