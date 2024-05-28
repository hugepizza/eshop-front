"use client";

import { SpecSelectContext } from "@/components/context/Shopping";
import { useContext } from "react";

function CartButton() {
  const { value } = useContext(SpecSelectContext);
  return <div onClick={() => alert(value.count)}>Checkout</div>;
}

export default CartButton;
