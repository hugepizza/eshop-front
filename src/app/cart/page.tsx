/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */

import CartCounter, {
  CartCountContextProvider,
  PriceDisplay,
} from "@/components/Counter/Cart";
import { CartApi, CartItem as CartItemType } from "@/requests/cart";
import { revalidatePath } from "next/cache";
import { Quattrocento, Quattrocento_Sans } from "next/font/google";
import Link from "next/link";
const q = Quattrocento({ weight: "400", subsets: ["latin"] });
const qs = Quattrocento_Sans({ weight: "400", subsets: ["latin"] });
async function Cart() {
  const cart = await CartApi.get();
  return (
    <section
      className={`px-48  w-full py-10 text-foregroundMuted relative ${q.className}`}
    >
      <div className="flex flex-row justify-between pb-8">
        <h2 className={`text-5xl text-start`}>Your Cart</h2>
        <div>
          <Link
            href={"/"}
            className="text-end underline-offset-1 underline hover:decoration-2"
          >
            Continue shopping
          </Link>
        </div>
      </div>
      <div className={`grid grid-cols-8 ${qs.className}`}>
        <Header />
        {cart.items.map((item) => (
          <CartItem key={item.productId} {...item} />
        ))}
      </div>
    </section>
  );
}

export default Cart;
function Header() {
  return (
    <>
      <div className="col-span-5 border-b-[1px] border-solid border-stone-200 text-xs font-extralight pb-4 text-stone-500 text-start">
        PRODUCT
      </div>
      <div className="col-span-2 border-b-[1px] border-solid border-stone-200 text-xs font-extralight pb-4 text-stone-500 text-start">
        QUANTITY
      </div>
      <div className="col-span-1 border-b-[1px] border-solid border-stone-200 text-xs font-extralight pb-4 text-stone-500 text-end">
        TOTAL
      </div>
    </>
  );
}
function CartItem(props: CartItemType) {
  return (
    <>
      <div className="flex flex-row space-x-8 col-span-5 border-b-[1px] border-solid border-stone-200 py-10 text-stone-500 text-start">
        <div>
          <img src={props.featuredImage} className="rounded-md w-28 h-18" />
        </div>
        <div className="flex flex-col space-y-2">
          <div className={`${q.className} text-foreground`}>{props.title}</div>
          <div
            className={`${q.className} text-foreground flex flex-row space-x-2 text-sm`}
          >
            {props.onSalePrice ? (
              <>
                <div className="line-through text-foregroundMuted">
                  {props.price}
                </div>{" "}
                <div>{props.onSalePrice}</div>
              </>
            ) : (
              <div>{props.price}</div>
            )}
          </div>
          <div
            className={`{qs.className} text-foreground text-sm flex flex-col space-y-2`}
          >
            {props.attributes.map((attr) => (
              <div key={attr.value}>
                {attr.key}: {attr.value}
              </div>
            ))}
          </div>
        </div>
      </div>
      <CartCountContextProvider>
        <div className="col-span-2 border-b-[1px] border-solid border-stone-200 py-8 text-stone-500 text-start">
          <CartCounter
            count={props.count}
            max={props.stock > 99 ? 99 : props.stock}
            skuId={props.skuId}
          />
        </div>
        <div className="space-y-2 col-span-1 border-b-[1px] border-solid border-stone-200 py-8 text-stone-500 text-end">
          <PriceDisplay total={props.total} subtotal={props.subtotal} />
        </div>
      </CartCountContextProvider>
    </>
  );
}
