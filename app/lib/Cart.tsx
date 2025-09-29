"use client";

import { useEffect, useState } from "react";
import { WooCart } from "../types/wooTypes";
import { getCart, addToCart } from "@/app/lib/api/woo";

interface CartProps {
  productId: string;
}
export default function Cart({productId} : CartProps) {
  const [cart, setCart] = useState<WooCart>();

  useEffect(() => {
    getCart().then(setCart);
  }, []);

  const handleAdd = async () => {
    await addToCart( productId ); // product ID
    setCart(await getCart()); // refresh
  };

  if (!cart) return <p>loading cart...</p>;

  return (
    <div>
      <h2>Cart</h2>
      {cart.items.map((item) => (
        <div key={item.key}>
          {item.name} x {item.quantity}
        </div>
      ))}
      <button onClick={handleAdd}>add item</button>
    </div>
  );
}
