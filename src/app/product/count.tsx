"use client";
import { SpecSelectContext } from "@/components/context/SpecSelect";
import ProductCounter from "@/components/Counter/Product";
import { useContext, useState } from "react";

function Count({ max }: { max: number }) {
  const { value, setValue } = useContext(SpecSelectContext);
  return (
    <ProductCounter
      count={value.count}
      setCount={(c) => setValue({ ...value, count: c })}
      max={max}
    />
  );
}

export default Count;
