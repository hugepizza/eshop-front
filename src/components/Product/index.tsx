/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import currency from "currency.js";
import styles from "./Product.module.css";
import { Quattrocento } from "next/font/google";
import Link from "next/link";

const inter = Quattrocento({ weight: "400", subsets: ["latin"] });

interface ProductProps {
  label: string;
  img: string;
  slug: string;
  price: number;
  onSalePrice?: number;
}
function Product(props: ProductProps) {
  return (
    <Link
      href={`/product/${props.slug}`}
      className={`h-[340px] flex flex-col max-h-full w-full rounded-md border-[1px] border-solid border-stone-300 ${styles.parent} ${inter.className} animate-fadeIn`}
    >
      <div className="w-full  overflow-hidden h-[260px]">
        <img
          className={`w-full object-cover object-center h-[260px] ${styles["image-container"]}`}
          src={props.img}
        />
      </div>
      <div className="flex flex-col justify-center p-6 w-full max-h-[80px] shrink">
        <div className={`${styles["text-container"]} text-foreground`}>
          {props.label}
        </div>
        <div className="flex flex-row items-center justify-start w-full gap-2">
          {props.onSalePrice ? (
            <div className="line-through text-sm text-foregroundMuted">
              {currency(props.price).format({ symbol: "HK$" })}
            </div>
          ) : (
            <div className="text-foreground">
              {currency(props.price).format({ symbol: "HK$" })}
            </div>
          )}
          {props.onSalePrice && (
            <div className="text-foreground">
              {currency(props.onSalePrice).format({ symbol: "HK$" })}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default Product;
