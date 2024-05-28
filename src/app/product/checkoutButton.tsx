"use client";

import { SpecSelectContext } from "@/components/context/SpecSelect";
import { useContext } from "react";

function CheckoutButton() {
  const { value } = useContext(SpecSelectContext);
  return (
    <div
      onClick={() => {
        if (!value.hitSkuId) {
          alert("?");
        }
        alert(value.count);
      }}
    >
      Checkout
    </div>
  );
}

export default CheckoutButton;
