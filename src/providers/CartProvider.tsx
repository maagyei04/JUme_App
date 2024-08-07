import { CartItem, Product } from "@/types";
import { useContext, createContext, PropsWithChildren, useState } from "react";
import { randomUUID } from "expo-crypto";

type CartType = {
    items: CartItem[],
    addItem: (product: Product, size: CartItem['size']) => void;
    updateQuantity: (itemId: string, amount: -1 | 1) => void;
    total: number;
    resetCart: () => void;
}

const CartContext = createContext<CartType>({
    items: [],
    addItem: () => { },
    updateQuantity: () => { },
    total: 0,
    resetCart: () => { },
})

const CartProvider = ({ children }: PropsWithChildren) => {
    const [items, setItems] = useState<CartItem[]>([]);

    const addItem = (product: Product, size: CartItem['size']) => {
        const existingItem = items.find(
            (item) => item.product === product && item.size === size
        );

        if (existingItem) {
            updateQuantity(existingItem.id, 1);
            return;
        }

        const newCartItem: CartItem = {
            id: randomUUID(),
            product,
            product_id: product.id,
            size,
            quantity: 1,
        };

        setItems([newCartItem, ...items]);
    }

    const updateQuantity = (itemId: string, amount: -1 | 1) => {
        console.log(itemId, amount);
        setItems(
            items.map(item =>
                item.id != itemId
                    ? item
                    : { ...item, quantity: item.quantity + amount }
            ).filter((item) => item.quantity > 0)
        );
    }

    console.log(items);

    const total = items.reduce(
        (sum, item) => (sum += item.product.price * item.quantity), 0
    );

    const resetCart = () => {
        setItems([]);
    }

    return (
        <CartContext.Provider value={{ items, addItem, updateQuantity, total, resetCart }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;

export const useCart = () => useContext(CartContext);