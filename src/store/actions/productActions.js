import { FETCH_PRODUCTS, FILTER_PRODUCTS_BY_SIZE, SORT_PRODUCTS_BY_PRICE } from "../types/types"

export const fetchProducts = () => async (dispatch) => {
    const res = await fetch("/api/products")
    const data = await res.json()
    dispatch({
        type: FETCH_PRODUCTS,
        payload: data
    })
}

export const filterProductsBySize = (products, size) => (dispatch) => {

    dispatch({
        type: FILTER_PRODUCTS_BY_SIZE,
        payload: {
            size: size,
            items:
                size === ""
                    ? products
                    : products.filter(x => x.availableSizes.indexOf(size) >= 0)
        }
    })
}

export const sortProductsByPrice = (products, sortDirection) => (dispatch) => {
    const sortedProducts = products.slice()
    sortedProducts.sort((a, b) => (
        sortDirection === "lowest" ?
            ((a.price > b.price) ? 1 : -1) :
            sortDirection === "highest" ?
                ((a.price < b.price) ? 1 : -1) :
                ((a._id < b._id) ? 1 : -1)
    ))

    dispatch({
        type: SORT_PRODUCTS_BY_PRICE,
        payload: {
            sort: sortDirection,
            items: sortedProducts
        }
    })
}