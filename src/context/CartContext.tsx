import { createContext } from "react";
import { IData } from "../data/data";

interface ContextProps {
    loading: boolean;
    cart: IData[];
    total: number;
    amount: number;

    //Methods
    clearCart: () => void;
    removeItem: (id: number) => void;
    toggleAmounts: (id: number, type: any) => void;
}

export const CartContext = createContext( {} as ContextProps );