import { createReducer, on } from '@ngrx/store';
import { addToCart } from './cart.action';
export const initialState = {
  cart: [],
};
export const cartReducer = createReducer(
  initialState,
  on(addToCart, (state: any, { productDetails }) => {
    console.log({ state });
    console.log({ productDetails });
    return { ...state, cart: [...state.cart, productDetails] };
  })
);
