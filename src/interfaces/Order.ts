export interface OrderUser {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
}

export interface OrderItemReview {
  id: string;
  rating: number;
  review: string;
  orderId?: string;
}

export interface OrderItemProduct {
  id?: string;
  name?: string;
  thumbnails?: (string | null)[];
  price?: number;
  reviews?: OrderItemReview[];
}

export interface OrderItem {
  id: string;
  productName?: string;
  price?: number;
  quantity?: number;
  size?: string;
  color?: string;
  product?: OrderItemProduct;
}

export interface Order {
  id: string;
  createdAt: string;
  date?: string;
  orderSubtotal: number;
  serviceFee?: number;
  totalAmount?: number;
  status: "Pending" | "Paid" | "Shipped" | "Delivered" | "Canceled" | string;
  User?: OrderUser;
  items?: OrderItem[];
}
