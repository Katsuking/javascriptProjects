// デフォルトでSSRになっているため、
// DB操作もできる

import ProductCart from "@/components/Portfolio/Cart/ProductCart";
import prisma from "@/lib/db/prisma";

export default async function PortofioPage() {
  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
  });
  return (
    <div>
      {" "}
      <ProductCart product={products[0]} />
    </div>
  );
}
