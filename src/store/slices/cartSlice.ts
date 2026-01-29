import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export type TCartItem = {
    product: string;
    name: string;
    image: string;
    price: number;
    type: "hardcopy" | "ebook";
    quantity: number;
};

type CartState = {
    items: TCartItem[];
};

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action) {
            const existing = state.items.find(
                (i) => i.product === action.payload.product
            );
            if (existing) {
                if (existing.type === "hardcopy") {
                    existing.quantity += action.payload.quantity;
                }
            } else {
                state.items.push(action.payload);
            }
        },
        updateItem(state, action) {
            const existing = state.items.find(
                (i) => i.product === action.payload.product
            );
            if (existing) {
                if (existing.type === "hardcopy") {
                    existing.quantity = action.payload.quantity;
                }
            }
        },
        removeItem(state, action) {
            state.items = state.items.filter(
                (i) => i.product !== action.payload
            );
        },
        clearCart(state) {
            state.items = [];
        },
    },
});

export const { addItem, updateItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

export const useCurrentCart = (state: RootState) => state.cart?.items;
export const useCurrentCartCount = (state: RootState) =>
    state.cart?.items.length || 0;
