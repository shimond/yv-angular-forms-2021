export interface Order {
  id: number;
  comment: string;
  comment2: string;
  orderItems: OrderItem[];
  shippingAddress: Address;
  hobbies: string[];
  orderDate: Date;
}

export interface OrderItem {
  id: number;
  productId: number;
  amount: number;
}

export interface Address {
  city: string;
  country: string
}
