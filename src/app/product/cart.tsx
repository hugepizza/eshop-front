"use client";

import { SpecSelectContext } from "@/components/context/SpecSelect";
import { useContext } from "react";

function CheckoutButton() {
  const { value } = useContext(SpecSelectContext);
  return <div onClick={() => alert(value.count)}>Checkout</div>;
}

export default CheckoutButton;
