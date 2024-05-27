/* eslint-disable @next/next/no-img-element */

import Sale from "@/components/Sale";
import currency from "currency.js";
import { Quattrocento } from "next/font/google";
import Price from "../price";
import { Input } from "@headlessui/react";
const q = Quattrocento({ weight: "400", subsets: ["latin"] });
import clsx from "clsx";
import Count from "../count";
import ShoppingProvider from "@/components/context/Shopping";
import CheckoutButton from "../checkoutButton";
import CartButton from "../cartButton";
import Specs from "../specs";

/* eslint-disable jsx-a11y/alt-text */
async function Product({ params }: { params: { slug: string } }) {
  const product = await fetch(
    `https://eshop-api-dev.ketianjiyi.com/product/${params.slug}`
  );

  const data = (await product.json()) as {
    data: {
      id: string;
      slug: string;
      title: string;
      price: number;
      onSalePrice?: number;
      featuredImage: string;
      attributes: {
        title: string;
        id: string;
        options: {
          id: string;
          text: string;
        }[];
      }[];
      skus: {
        id: string;
        featuredImage: string;
        price: number;
        onSalePrice?: number;
        attributes: string[];
      }[];
    };
  };
  return (
    <section
      className={`px-48  w-full py-10 grid grid-cols-7 gap-12 relative ${q.className}`}
    >
      <div className="col-span-4 sticky rounded-md overflow-hidden">
        <img
          className="h-[400px] w-full object-cover object-center"
          src={data.data.featuredImage}
        />
      </div>
      <div className="col-span-3 transition-all translate-y-1 space-y-4">
        <div className="">eshop</div>
        <div className="text-4xl">{data.data.title}</div>
        <Price price={data.data.price} onSalePrice={data.data.onSalePrice} />
        <ShoppingProvider productId={data.data.id}>
          <Specs
            canSelect={data.data.skus.map((sku) => sku.attributes)}
            specs={data.data.attributes.map((attr) => ({
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
        </ShoppingProvider>
      </div>
    </section>
  );
}

export default Product;
