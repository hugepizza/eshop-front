"use client";
import { SpecSelectContext } from "@/components/context/Shopping";
import { Input } from "@headlessui/react";
import clsx from "clsx";
import { useContext, useState } from "react";

function Count({ max }: { max: number }) {
  const { value, setValue } = useContext(SpecSelectContext);
  return (
    <div className="border-black border-solid border-[1px] w-36 flex items-center justify-center rounded-md">
      <div
        className="flex justify-center items-center w-12"
        onClick={() =>
          value.count > 1 && setValue({ ...value, count: value.count - 1 })
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
          "focus:outline-none bg-background"
        )}
        value={value.count}
        name="full_name"
        type="number"
        onChange={(e) =>
          e.target.value !== "0" &&
          setValue({ ...value, count: parseInt(e.target.value, 10) })
        }
      />
      <div
        className="flex justify-center items-center w-12"
        onClick={() =>
          value.count < max && setValue({ ...value, count: value.count + 1 })
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

export default Count;
