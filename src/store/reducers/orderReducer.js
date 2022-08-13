import { CLEAR_ORDER, CREATE_ORDER, FETCH_ORDERS } from "../types/types"

export const orderReducer = (state = {}, action) => {
    switch (action.type) {

        case CLEAR_ORDER:
            return { order: null }
        case CREATE_ORDER:
            return { order: action.payload }
        case FETCH_ORDERS:
            return { orders: action.payload }
        default:
            return state
    }
}

export default orderReducer