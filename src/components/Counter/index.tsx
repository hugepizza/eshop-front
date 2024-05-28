"use client";
import { Input } from "@headlessui/react";
import clsx from "clsx";
import { useTransition } from "react";
interface CountProps {
  max: number;
  count: number;
  setCount: (count: number) => Promise<void> | void;
}
function Counter({ count, setCount, max }: CountProps) {
  const [isPending, startTransition] = useTransition();
  return (
    <div className="border-black border-solid border-[1px] w-36 flex items-center justify-center rounded-md">
      <div
        className={clsx(
          "flex justify-center items-center w-12",
          isPending && "text-stone-400"
        )}
        onClick={() =>
          startTransition(async () => {
            count > 1 && (await setCount(count - 1));
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
        value={count}
        name="full_name"
        type="number"
        onChange={(e) =>
          startTransition(async () => {
            e.target.value !== "0" && setCount(parseInt(e.target.value, 10));
          })
        }
      />
      <div
        className={clsx(
          "flex justify-center items-center w-12",
          isPending && "text-stone-400"
        )}
        onClick={() =>
          startTransition(async () => {
            count < max && (await setCount(count + 1));
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

export default Counter;
