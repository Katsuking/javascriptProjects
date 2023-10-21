import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCart } from "@/lib/db/portfolio/cart";
import ShoppingCartButton from "./ShoppingCartButton";

// search item
async function searchProduct(formData: FormData) {
  "use server";
  const searchQuery = formData.get("searchQuery")?.toString(); // server action
  if (searchQuery) {
    redirect("/portfolio/search?query=" + searchQuery);
  }
}

export default async function Navbar() {
  const cart = await getCart();

  return (
    <div className="bg-base-100 ">
      <div className="navbar m-auto max-w-7xl flex-col gap-2 sm:flex-row">
        <div className="flex-1">
          <Link href={"/"} className="btn-ghost btn text-xl normal-case">
            <Image src="/outer_space.png" alt="mylog" height={40} width={40} />
            myshop
          </Link>
        </div>
        <div className="flex-none gap-2">
          <form action={searchProduct}>
            <div className="form-control">
              <input
                type="text"
                name="searchQuery"
                placeholder="search"
                className="input-bordered input w-full min-w-[100px]"
              />
            </div>
          </form>
          <ShoppingCartButton cart={cart} />
        </div>
      </div>
    </div>
  );
}
