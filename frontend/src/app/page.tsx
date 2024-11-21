import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { getProducts } from "./products/products.api";
import { ProductCard } from "@/components/product-card";
import { FaCartShopping } from "react-icons/fa6";
import { productsInitialState, productsReducer } from "@/reducers/shoppingCartReducer";
import TYPES from "@/reducers/actionsTypes";

export const dynamic = "force-dynamic";

async function HomePage() {

  const products = await getProducts();

   // Set products to initial state
   productsInitialState.products = products.map(product => ({
    id: product.id,
    name: product.name,
    price: product.price,
    description: product.description,
    image: product.image
  }));

  console.log(productsInitialState.products)

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">Punto Acido</h1>

        <Link href="/cart">
          <FaCartShopping/>
        </Link>
        

        <Link href="/products/new" className={buttonVariants()}>
          Create Product
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
        {products.map((product: any) => (
          <ProductCard product={product} key={product.id} data= {product}  />
        ))}
      </div>
    </>
  );
}
export default HomePage;
