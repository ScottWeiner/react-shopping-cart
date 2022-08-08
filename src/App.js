//feature 1 - example
import React, { Component } from 'react'
import data from "./data.json"
import Products from './components/Products'
import Filter from './components/Filter'
import Cart from './components/Cart'

class App extends Component {
  constructor() {
    super()
    this.state = {
      products: data.products,
      size: "",
      sort: "",
      cartItems: []
    }

  }

  removeFromCart = (product) => {
    //make a clone of the current cartItems array in the app State
    const cartItems = this.state.cartItems.slice()

    this.setState({ cartItems: cartItems.filter(x => x._id !== product._id) })


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

  }

  filterProducts = (event) => {
    console.log(event.target.value)

    if (event.target.value === '') {
      this.setState({
        size: event.target.value,
        products: data.products
      })
    } else {
      this.setState({
        size: event.target.value,
        products: data.products.filter(x => x.availableSizes.indexOf(event.target.value) >= 0)
      })
    }

  }

  sortProducts = (event) => {
    const sort = event.target.value
    console.log('sort: ', sort)
    this.setState(state => ({
      sort: sort,
      products: this.state.products.slice().sort((a, b) => (
        sort === "lowest" ?
          ((a.price > b.price) ? 1 : -1) :
          sort === "highest" ?
            ((a.price < b.price) ? 1 : -1) :
            ((a._id < b._id) ? 1 : -1)
      ))
    }))

  }

  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter
                count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}

              />
              <Products
                products={this.state.products}
                addToCart={this.addToCart}
              />
            </div>
            <div className="sidebar">
              <Cart
                cartItems={this.state.cartItems}
                removeFromCart={this.removeFromCart}
              />
            </div>
          </div>
        </main>
        <footer>Some rights reserved, but not all.</footer>
      </div>
    );
  }
}

export default App;
