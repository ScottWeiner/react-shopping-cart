import { REMOVE_FROM_CART, ADD_TO_CART } from "../types/types"


export const addProductToCart = (product) => (dispatch, getState) => {
    const modifiedCartItems = getState().cart.cartItems.slice()

    let alreadyInCart = false

    modifiedCartItems.forEach(item => {
        if (item._id === product._id) {
            item.count++;
            alreadyInCart = true
        }
    });

    if (!alreadyInCart) {
        modifiedCartItems.push({ ...product, count: 1 })
    }

    dispatch({
        type: ADD_TO_CART,
        payload: {
            cartItems: modifiedCartItems
        }
    })

    localStorage.setItem("cartItems", JSON.stringify(modifiedCartItems))
}


export const removeProductFromCart = (product) => (dispatch, getState) => {
    const modifiedCartItems = getState().cart.cartItems.slice().filter(x => x._id !== product._id)


    dispatch({
        type: REMOVE_FROM_CART,
        payload: {
            cartItems: modifiedCartItems
        }
    })

    localStorage.setItem("cartItems", JSON.stringify(modifiedCartItems))
}