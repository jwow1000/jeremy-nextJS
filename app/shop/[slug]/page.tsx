import { getProductBySlug } from "@/app/lib/api/fetch";
import styles from "@/app/ui/shopDetail.module.css";
import shopStyles from "@/app/ui/shop.module.css";

type Params = Promise<{ slug: string }>
 
export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params
}
 
export default async function ProductDetail({
  children,
  params,
}: {
  children: React.ReactNode
  params: Params
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  console.log("the product: ", product, slug)

  
  return (
    <main className={shopStyles.main}>
      <h1 className={shopStyles.header}>{product.name}</h1>
      <button className={shopStyles.buyButton}></button>
    </main>
  )
}