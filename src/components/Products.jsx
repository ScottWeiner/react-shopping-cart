import React, { Component } from 'react'
import formatCurrency from '../utilities/utilities'
import Fade from 'react-reveal/Fade'
import Zoom from 'react-reveal/Zoom'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { fetchProducts } from '../store/actions/productActions'

class Products extends Component {

    constructor(props) {
        super(props)

        this.state = {
            product: null
        }
    }

    componentDidMount() {
        this.props.fetchProducts()
    }

    openModal = (product) => {
        this.setState({ product: product })
    }

    closeModal = () => {
        this.setState({ product: null })
    }

    render() {

        const { product } = this.state

        return (
            <div>
                <Fade bottom cascade>
                    {
                        !this.props.filteredProducts ? (
                            <div>Loading....</div>
                        ) : (
                            <ul className="products">
                                {this.props.filteredProducts.map(prod => (
                                    <li key={prod._id}>
                                        <div className="product">
                                            <a href={`#${prod._id}`} onClick={() => this.openModal(prod)}>
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
                            </ul>)
                    }
                </Fade >
                {
                    product && (
                        <Modal isOpen={true} onRequestClose={this.closeModal}>
                            <Zoom>
                                <button className='close-modal' onClick={this.closeModal}>x</button>
                                <div className='product-details'>
                                    <img src={product.image} alt={product.title}></img>
                                    <div className='product-details-description'>
                                        <p><strong>{product.title}</strong></p>
                                        <p>{product.description}</p>
                                        <p>
                                            Available Sizes
                                            {product.availableSizes.map(size => (
                                                <span>{" "}<button className='button'>{size}</button></span>
                                            ))}
                                        </p>
                                        <div className='product-price'>
                                            <div>{formatCurrency(product.price)}</div>
                                            <button className='button primary' onClick={() => {
                                                this.props.addToCart(product)
                                                this.closeModal()
                                            }}>
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Zoom>
                        </Modal>
                    )
                }
            </div>

        )
    }
}

export default connect(
    (state) => (
        {
            products: state.products.items,
            filteredProducts: state.products.filteredItems
        }
    ),
    { fetchProducts })(Products)
