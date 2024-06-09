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