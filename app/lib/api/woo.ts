const API_URL = process.env.WOO_URL; 

export async function addToCart(productId: string, quantity = 1) {
  const res = await fetch(`${API_URL}/wp-json/wc/store/cart/add-item`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", //important for cookies
    body: JSON.stringify({
      id: productId,
      quantity,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to add to cart");
  }

  return res.json();
}

// read cart contents
export async function getCart() {
  const res = await fetch(`${API_URL}/wp-json/wc/store/cart`, {
    method: "GET",
    credentials: "include",
  });
  return res.json();
}
