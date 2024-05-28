'use client'
import { SpecSelectContext } from "@/components/context/SpecSelect";
import Sale from "@/components/Sale";
import currency from "currency.js";
import { useContext } from "react";

function Price() {
  const { value } = useContext(SpecSelectContext);
  return (
    <div className="flex flex-row items-center justify-start w-full gap-2">
      {value.onSalePrice ? (
        <div className="line-through text-sm">
          {currency(value.price).format({ symbol: "HK$" })}
        </div>
      ) : (
        <div>{currency(value.price).format({ symbol: "HK$" })}</div>
      )}
      {value.onSalePrice && (
        <>
          <div>{currency(value.onSalePrice).format({ symbol: "HK$" })}</div>
          <Sale />
        </>
      )}
    </div>
  );
}

export default Price;
