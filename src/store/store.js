import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'
import { productsReducer } from './reducers/productsReducer'

const initialState = {}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
    products: productsReducer
})

const store = createStore(reducers, initialState, composeEnhancer(applyMiddleware(thunk)))

export default store