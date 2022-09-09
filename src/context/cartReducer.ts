import { data, IData } from '../data/data';
import { CartState } from "./CartProvider";

type CartActionType =
| {type: '[Cart] Load Cart'}
| {type: '[Cart] Add Cart', payload: IData[]}
| {type: '[Cart] Clear Cart'}
| {type: '[Cart] Toggle Amounts', payload: {id: number, type: string}}
| {type: '[Cart] Get Totals'}
| {type: '[Cart] Remove Item', payload: number}

export const cartReducer = (state:CartState, action:CartActionType) => {

    let tempCart:IData[] = [];

switch(action.type){
    
    case "[Cart] Load Cart":
        return {
            ...state,
            loading: true
        }
    case "[Cart] Add Cart":
        return {
            ...state,
            loading: false,
            cart: action.payload
        }

    case "[Cart] Clear Cart":
        return {
            ...state,
            cart: []
        }

    case '[Cart] Toggle Amounts':
        tempCart = state.cart.map( cartItem => {
            if(cartItem.id === action.payload.id){
                if(action.payload.type === 'inc'){
                    return {
                        ...cartItem,
                        amount: cartItem.amount + 1
                    }
                }

                if(action.payload.type === 'dec'){
                    return {
                        ...cartItem,
                        amount: cartItem.amount - 1
                    }
                }
            }
            return cartItem;
        }).filter( (item) => item.amount !== 0)
        return {
            ...state,
            cart: tempCart
        }
    
    case '[Cart] Get Totals':

        let {amount, total} = state.cart.reduce( (cartTotal, cartItem) => {
            const {price, amount} = cartItem;
            const itemTotal = price * amount;

            cartTotal.total += itemTotal;
            cartTotal.amount += amount;
            return cartTotal;
        }, {
            total: 0,
            amount: 0
        });

        total = parseFloat(total.toFixed(2));
       
        return {
            ...state,
            amount,
            total
        }

    case "[Cart] Remove Item":
        return {
            ...state,
            cart: state.cart.filter( item => item.id !== action.payload)
        }

    default:
         return state;
}
    
}