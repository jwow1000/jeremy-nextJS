export interface WooCartItem {
  key: string;
  id: number;
  name: string;
  quantity: number;
  totals: {
    line_subtotal: string;
    line_total: string;
    currency_code: string;
  };
  images: { id: number; src: string; thumbnail: string; alt: string }[];
}

export interface WooCart {
  items: WooCartItem[];
  totals: {
    total_price: string;
    currency_code: string;
    total_items: number;
  };
}
