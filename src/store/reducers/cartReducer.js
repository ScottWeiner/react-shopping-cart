import { REMOVE_FROM_CART, ADD_TO_CART } from "../types/types";

export const cartReducer = (state = { cartItems: JSON.parse(localStorage.getItem("cartItems") || "[]") }, action) => {
    switch (action.type) {
        case ADD_TO_CART:

            return {

                cartItems: action.payload.cartItems
            }


        case REMOVE_FROM_CART:
            return {

                cartItems: action.payload.cartItems
            }

        default:
            return state
    }
}