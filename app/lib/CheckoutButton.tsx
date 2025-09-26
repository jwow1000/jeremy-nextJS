import { useRouter } from "next/router";

const url = process.env.WOO_URL; 

export function CheckoutButton() {
  const router = useRouter();

  const goToCheckout = () => {
    router.push(`${url}/checkout`);
  };

  return <button onClick={goToCheckout}>Checkout</button>;
}