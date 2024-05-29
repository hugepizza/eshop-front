"use client";
import { CartApi } from "@/requests/cart";
import { Input } from "@headlessui/react";
import clsx from "clsx";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useTransition,
} from "react";

import Spin from "../Spin";
import { reload } from "@/actions/cart";
interface CountProps {
  skuId: string;
  max: number;
  count: number;
}

const CartCountContext = createContext({
  isPending: false,
  setisPending: (v: boolean) => {},
});
export function CartCountContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isPending, setisPending] = useState(false);
  return (
    <CartCountContext.Provider value={{ isPending, setisPending }}>
      {children}
    </CartCountContext.Provider>
  );
}

export function PriceDisplay({
  total,
  subtotal,
}: {
  total: string;
  subtotal: string;
}) {
  const { isPending } = useContext(CartCountContext);
  return (
    <>
      {isPending ? (
        <div className="flex flex-row w-full h-full justify-end items-start">
          <Spin />
        </div>
      ) : (
        <>
          <div className="text-sm line-through text-foregroundMuted">
            {subtotal}
          </div>
          <div className="text-foreground">{total}</div>
        </>
      )}
    </>
  );
}

function CartCounter({ skuId, count, max }: CountProps) {
  const [localCount, setLocalCount] = useState(count);
  const [isPending, startTransition] = useTransition();
  const { setisPending } = useContext(CartCountContext);
  useEffect(() => {
    setLocalCount(count);
  }, [count]);
  useEffect(() => {
    setisPending(isPending);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending]);
  return (
    <div className="border-black border-solid border-[1px] w-36 flex items-center justify-center rounded-md">
      <div
        className={clsx(
          "flex justify-center items-center w-12",
          isPending && "text-stone-400"
        )}
        onClick={() =>
          startTransition(async () => {
            await CartApi.update(skuId, -1);
            reload();
          })
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 12h14"
          ></path>
        </svg>
      </div>
      <Input
        max={max}
        className={clsx(
          "text-center aspect-square w-12 border-none py-1.5 px-3",
          "focus:outline-none bg-background",
          isPending && "text-stone-400"
        )}
        value={localCount}
        name="full_name"
        type="number"
        onChange={(e) => setLocalCount(parseInt(e.target.value, 10))}
        onBlur={() => {
          startTransition(async () => {
            const diff = localCount - count;
            await CartApi.update(skuId, diff);
            reload();
          });
        }}
      />
      <div
        className={clsx(
          "flex justify-center items-center w-12",
          isPending && "text-stone-400"
        )}
        onClick={() =>
          startTransition(async () => {
            if (count >= max) {
              return;
            }
            await CartApi.update(skuId, +1);
            reload();
          })
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 12h7m7 0h-7m0 0V5m0 7v7"
          ></path>
        </svg>
      </div>
    </div>
  );
}

export default CartCounter;
