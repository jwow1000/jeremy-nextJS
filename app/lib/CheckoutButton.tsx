import shopStyles from "@/app/ui/shop.module.css";
import Link from "next/link";

const url = process.env.WOO_URL; 

interface ButtonProps {
  text: string;
}

export function CheckoutButton({text} : ButtonProps) {

  return (
    <Link
      href={`${url}/checkout`}
      className={shopStyles.buyButton}
    >
      {text}
    </Link>
  )
}