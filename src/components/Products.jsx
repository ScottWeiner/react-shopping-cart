import React, { Component } from 'react'
import formatCurrency from '../utilities/utilities'

export default class Products extends Component {



    render() {
        return (
            <div>
                <ul className="products">
                    {this.props.products.map(prod => (
                        <li key={prod._id}>
                            <div className="product">
                                <a href={`#${prod._id}`}>
                                    <img src={prod.image} alt="product"></img>
                                    <p>{prod.title}</p>
                                </a>
                                <div className="product-price">
                                    <div>
                                        {formatCurrency(prod.price)}
                                    </div>
                                    <button onClick={() => this.props.addToCart(prod)} className="button primary">Add to Cart</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}
