import { getProductBySlug } from "@/app/lib/api/fetch";
import Cart from "@/app/lib/Cart";
import Image from "next/image";
import shopStyles from "@/app/ui/shop.module.css";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  return {
    title: product.name,
    description:
      product.short_description || product.description?.slice(0, 160),
    openGraph: {
      title: product.name,
      description:
        product.short_description || product.description?.slice(0, 160),
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/shop/${slug}`,
      images: [
        {
          url: product.images?.[0]?.node.sourceUrl || "/default-og.png",
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description:
        product.short_description || product.description?.slice(0, 160),
      images: [product.images?.[0]?.node.sourceUrl || "/default-og.png"],
    },
  };
}

export default async function ProductDetail({ params }: { params: Params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  console.log("product: ", product.galleryImages.nodes);

  return (
    <main className={shopStyles.main}>
      <h1 className={shopStyles.header}>{product.name}</h1>
      {product.description}
      <div className={shopStyles.galleryWrapper}>
        {product.galleryImages &&
          product.galleryImages.nodes.map((image, idx) => (
            <div
              className={shopStyles.imageWrapper}
              key={`${product.name}-image-${idx}`}
            >
              <Image
                src={image.sourceUrl}
                fill
                alt={image.altText || `${product.name}-image-${idx}`}
                style={{ objectFit: "contain", height: "100%", width: "100%" }}
              />
            </div>
          ))}
      </div>
      {/* <CheckoutButton text={'add item to cart'}/> */}
      {product.id && <Cart productId={product.id} />}
    </main>
  );
}
