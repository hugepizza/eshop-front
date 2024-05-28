"use client";
import { SpecSelectContext } from "@/components/context/SpecSelect";
import Counter from "@/components/Counter";
import { useContext, useState } from "react";

function Count({ max }: { max: number }) {
  const { value, setValue } = useContext(SpecSelectContext);
  return (
    <Counter
      count={value.count}
      setCount={(c) => setValue({ ...value, count: c })}
      max={max}
    />
  );
}

export default Count;
