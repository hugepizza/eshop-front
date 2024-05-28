/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */

import Link from "next/link";
import styles from "./Collection.module.css";
import { Quattrocento } from "next/font/google";

const inter = Quattrocento({ weight: "400", subsets: ["latin"] });

interface CollectionProps {
  label: string;
  img: string;
  slug: string;
  height?: string;
}
function Collection(props: CollectionProps) {
  return (
    <Link
      href={`/collections/${props.slug}`}
      className={`h-[500px] flex flex-col max-h-full w-full rounded-md border-[1px] border-solid border-stone-300 ${styles.parent} ${inter.className} animate-fadeIn`}
    >
      <div className="w-full  overflow-hidden h-[420px]">
        <img
          className={`w-full object-cover object-center h-[420px] ${styles["image-container"]}`}
          src={props.img}
        />
      </div>
      <div className="flex items-center p-6 w-full min-h-[80px] max-h-[80px]">
        {props.label}
        <div className={`${styles["text-container"]}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M4 11v2h12l-5.5 5.5l1.42 1.42L19.84 12l-7.92-7.92L10.5 5.5L16 11z"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}

export default Collection;
