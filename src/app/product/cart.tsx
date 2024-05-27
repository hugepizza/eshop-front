"use client";

import { ShoppingContext } from "@/components/context/Shopping";
import { useContext } from "react";

function CheckoutButton() {
  const { value } = useContext(ShoppingContext);
  return <div onClick={() => alert(value.count)}>Checkout</div>;
}

export default CheckoutButton;
