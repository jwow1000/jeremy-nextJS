import { getProducts } from "../lib/api/fetch";
import Image from "next/image";
import noImage from "@/public/jwy_logo_24.svg";
// import styles from "@/app/ui/page.module.css";
import shopStyles from "@/app/ui/shop.module.css";
import Link from "next/link";

export default async function Shop() {
  const products = await getProducts();

  return (
    <main className={shopStyles.main}>
      <h1 className={shopStyles.header}>shop</h1>
      {products.length > 0 && (
        <div className={shopStyles.productsWrapper}>
          {products.map((product) => (
            <Link
              href={`shop/${product.slug}`}
              className={shopStyles.productContainer}
              key={`product-${product.name}`}
              style={{textTransform: 'uppercase',
              }}
            >
              <h2 className={shopStyles.header}
                style={{border: 'solid 1px white', padding: '0.2rem', lineHeight: '90%'}}
              >{product.name}</h2>
              <p className={shopStyles.price}>
                {`$${product.price}`}
              </p>
              <div className={shopStyles.imageWrapper}>
                <Image
                  src={product.featuredImage?.node.sourceUrl || noImage}
                  alt={product.featuredImage?.node.altText || noImage}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
