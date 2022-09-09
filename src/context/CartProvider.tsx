import { FC, ReactElement, useEffect, useReducer } from 'react';
import { CartContext } from './CartContext';
import { cartReducer } from './cartReducer';
import { data, IData } from '../data/data';
import { url } from '../data/constants';

interface Props {
    children: ReactElement;
}

export interface CartState {
    loading: boolean;
    cart: IData[];
    total: number;
    amount: number;
}

const CART_INITIAL_STATE:CartState = {
    loading: false,
    cart: [],
    total: 0,
    amount: 0
}

export const CartProvider:FC<Props> = ({children}) => {

    const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

    useEffect(() => {
      dispatch({type: '[Cart] Get Totals'});      
    }, [state.cart])
    
    const fetchData = async() => {
        try {
            dispatch({type: '[Cart] Load Cart'});
            const response = await fetch(url);
            const cart = await response.json();
            dispatch({type:'[Cart] Add Cart', payload: cart});
        } catch (error) {
            console.log(error);
            throw new Error('Problems with fetching data')
        }
    };

    useEffect(()=> {
        fetchData()
    }, []);

    const toggleAmounts = (id: number, type: string) => {
        dispatch({type: '[Cart] Toggle Amounts', payload: {id, type}});
    };

    const removeItem = (id: number) => {
        dispatch({type: '[Cart] Remove Item', payload: id});
    };
    
    const clearCart = () => {
        dispatch({type: '[Cart] Clear Cart'})
    };

    return (
        <CartContext.Provider value={{
            ...state,

            //Methods
            clearCart,
            removeItem,
            toggleAmounts
        }}>
            {children}
        </CartContext.Provider>)
};