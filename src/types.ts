import { ImageSourcePropType } from "react-native";

export type Product = {
    id: number;
    name: string;
    price: number;
    image: ImageSourcePropType;
}

export type ProductSize = 'S' | 'M' | 'L' | 'XL';

export type CartItem = {
    id: string;
    product: Product;
    product_id: number;
    size: ProductSize;
    quantity: number;
}

export type Category = {
    id: number;
    name: string;
    image: ImageSourcePropType;
}

export const OrderStatusList: OrderStatus[] = [
    'New',
    'Confirmed',
    'Delivering',
    'Delivered',
]

export type OrderStatus = 'New' | 'Confirmed' | 'Delivering' | 'Delivered';

export type Order = {
    id: number;
    created_at: string;
    total: number;
    user_id: string;
    status: OrderStatus;

    order_items?: OrderItem[];
}

export type OrderItem = {
    id: number;
    product_id: number;
    products: Product;
    order_id: number;
    size: ProductSize;
    quantity: number;
}