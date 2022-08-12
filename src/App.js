//feature 1 - example
import React, { Component } from 'react'

import Products from './components/Products'
import Filter from './components/Filter'
import Cart from './components/Cart'
import store from './store/store'
import { Provider } from 'react-redux'

class App extends Component {
  constructor() {
    super()
    this.state = {
      products: [],
      size: "",
      sort: "",
      cartItems: JSON.parse(localStorage.getItem("cartItems")) || []
    }

  }

  createOrder = (order) => {
    alert("Need to save order for " + order.name)
  }

  removeFromCart = (product) => {
    //make a clone of the current cartItems array in the app State
    const cartItems = this.state.cartItems.slice()

    const modifiedCartItems = cartItems.filter(x => x._id !== product._id)

    this.setState({ cartItems: modifiedCartItems })
    localStorage.setItem("cartItems", JSON.stringify(modifiedCartItems))

  }

  addToCart = (product) => {
    //make a clone of the current cartItems array in the app State
    const cartItems = this.state.cartItems.slice()

    let alreadyInCart = false

    cartItems.forEach(item => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true
      }
    });
    if (!alreadyInCart) {
      cartItems.push({ ...product, count: 1 })
    }
    this.setState({ cartItems })

    localStorage.setItem("cartItems", JSON.stringify(cartItems))

  }



  render() {
    return (
      <Provider store={store}>
        <div className="grid-container">
          <header>
            <a href="/">React Shopping Cart</a>
          </header>
          <main>
            <div className="content">
              <div className="main">
                <Filter


                />
                <Products

                  addToCart={this.addToCart}
                />
              </div>
              <div className="sidebar">
                <Cart
                  cartItems={this.state.cartItems}
                  removeFromCart={this.removeFromCart}
                  createOrder={this.createOrder}
                />
              </div>
            </div>
          </main>
          <footer>Some rights reserved, but not all.</footer>
        </div>
      </Provider>

    );
  }
}

export default App;
