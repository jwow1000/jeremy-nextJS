"use client";
import { useEffect, useState } from "react";
import { getCart, addToCart } from "@/app/lib/api/woo";

export default function Cart(productId: number) {
  const [cart, setCart] = useState<any>(null);

  useEffect(() => {
    getCart().then(setCart);
  }, []);

  const handleAdd = async () => {
    await addToCart(productId); // product ID
    setCart(await getCart()); // refresh
  };

  if (!cart) return <p>Loading cart...</p>;

  return (
    <div>
      <h2>Cart</h2>
      {cart.items.map((item: any) => (
        <div key={item.key}>
          {item.name} x {item.quantity}
        </div>
      ))}
      <button onClick={handleAdd}>Add Product</button>
    </div>
  );
}
