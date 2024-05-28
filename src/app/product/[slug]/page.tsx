/* eslint-disable @next/next/no-img-element */

import { Quattrocento } from "next/font/google";
import Price from "../price";
const q = Quattrocento({ weight: "400", subsets: ["latin"] });
import Count from "../count";
import SpecSelectProvider from "@/components/context/SpecSelect";
import CheckoutButton from "../checkoutButton";
import CartButton from "../cartButton";
import Specs from "../specs";
import { productApi } from "@/requests/prooduct";

/* eslint-disable jsx-a11y/alt-text */
async function Product({ params }: { params: { slug: string } }) {
  const product = await productApi.get(params.slug);
  const defalutSku =
    product.skus.find((sku) => sku.isDefault) ?? product.skus[0];
  return (
    <section
      className={`px-48  w-full py-10 grid grid-cols-7 gap-12 text-foregroundMuted relative ${q.className}`}
    >
      <div className="col-span-4 sticky rounded-md overflow-hidden">
        <img
          className="h-[400px] w-full object-cover object-center"
          src={defalutSku.featuredImage}
        />
      </div>
      <div className="col-span-3 space-y-4 animate-fadeIn">
        <div className="">eshop</div>
        <div className="text-4xl text-foreground">{product.title}</div>
        <SpecSelectProvider
          hitSkuId={defalutSku.id}
          productId={product.id}
          price={defalutSku.price}
          onSalePrice={defalutSku.onSalePrice}
          skus={product.skus}
        >
          <Price />
          <Specs
            defaultSelectedSpecs={defalutSku.attributes}
            specs={product.attributes.map((attr) => ({
              name: attr.title,
              options: attr.options.map((opt) => ({
                name: opt.text,
                value: opt.id,
              })),
            }))}
          />
          <Count max={5} />
          <CheckoutButton />
          <CartButton />
        </SpecSelectProvider>
      </div>
    </section>
  );
}

export default Product;
