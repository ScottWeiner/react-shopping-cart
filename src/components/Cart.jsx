import React, { Component } from 'react'
import formatCurrency from '../utilities/utilities'
import Fade from 'react-reveal/Fade'
import { connect } from 'react-redux'
import { removeProductFromCart } from '../store/actions/cartActions'
import { createOrder, clearOrder } from '../store/actions/orderActions'
import Modal from 'react-modal/lib/components/Modal'
import Zoom from 'react-reveal/Zoom'

class Cart extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            email: '',
            address: '',
            showCheckout: false
        }
    }

    handleInput = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleCreateOrder = (e) => {
        e.preventDefault()
        const order = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            cartItems: this.props.cartItems,
            total: this.props.cartItems.reduce((a, c) => a + (c.price * c.count), 0)
        }
        this.props.createOrder(order)
    }

    closeModal = () => {
        this.props.clearOrder()
    }

    formatDate = (date) => {
        return new Date(date).toLocaleString('en-US')
    }

    render() {

        const { cartItems, order } = this.props

        return (
            <>
                <div>
                    {
                        cartItems.length === 0 ? <div className='cart cart-header'> Cart is Empty!</div>
                            :
                            <div className='cart cart-header'>
                                You have {cartItems.length} items in the cart{" "}
                            </div>
                    }
                </div>
                {
                    order && (
                        <Modal isOpen={true} onRequestClose={this.closeModal}>
                            <Zoom>
                                <button className="close-modal" onClick={this.closeModal}>x</button>
                                <div className="order-details">
                                    <h3 className='success-message'>Your order has been placed!</h3>
                                    <h2>Order {order._id}</h2>
                                    <ul>
                                        <li>
                                            <div>Name:</div>
                                            <div>{order.name}</div>
                                        </li>
                                        <li>
                                            <div>Address:</div>
                                            <div>{order.address}</div>
                                        </li>
                                        <li>
                                            <div>Email:</div>
                                            <div>{order.email}</div>
                                        </li>
                                        <li>
                                            <div>Date:</div>
                                            <div>{this.formatDate(order.createdAt)}</div>
                                        </li>
                                        <li>
                                            <div>Cart Items:</div>
                                            <div>{order.cartItems.map(item => (
                                                <div>

                                                    {item.count} x {item.title}
                                                </div>
                                            ))}</div>
                                        </li>
                                        <li>
                                            <div>Total:</div>
                                            <div>{formatCurrency(order.total)}</div>
                                        </li>
                                    </ul>
                                </div>
                            </Zoom>
                        </Modal>
                    )
                }
                <div>
                    <div className="cart">
                        <Fade left cascade>
                            <ul className="cart-items">
                                {cartItems.map(item => (
                                    <li key={item._id}>
                                        <div>
                                            <img src={item.image} alt={`${item.title}`} />
                                        </div>
                                        <div>{item.title}</div>
                                        <div className="right">
                                            {formatCurrency(item.price)} x {item.count}{" "}
                                            <button onClick={() => this.props.removeProductFromCart(item)}>Remove</button>
                                        </div>

                                    </li>
                                ))}
                            </ul>
                        </Fade>
                    </div>
                    {cartItems.length > 0 &&
                        <div>
                            <div className="cart">
                                <div className="total">
                                    <div>
                                        Total:{" "}
                                        {formatCurrency(cartItems.reduce((a, c) => a + (c.price * c.count), 0))}
                                    </div>
                                    <button onClick={() => this.setState({ showCheckout: true })} className="button primary">Proceed</button>
                                </div>
                            </div>
                            {this.state.showCheckout && (
                                <Fade right cascade>
                                    <div className='cart'>
                                        <form onSubmit={this.handleCreateOrder}>
                                            <ul className='form-container'>
                                                <li>
                                                    <label>Email</label>
                                                    <input name="email" type="email" required onChange={this.handleInput}></input>
                                                </li>
                                                <li>
                                                    <label>Name</label>
                                                    <input name="name" type="text" required onChange={this.handleInput}></input>
                                                </li>
                                                <li>
                                                    <label>Address</label>
                                                    <input name="address" type="tex" required onChange={this.handleInput}></input>
                                                </li>
                                                <li>
                                                    <button className="button primary" type="submit">Checkout</button>
                                                </li>
                                            </ul>
                                        </form>

                                    </div>
                                </Fade>
                            )}
                        </div>
                    }
                </div>
            </>
        )
    }
}


export default connect(
    (state) => ({
        cartItems: state.cart.cartItems,
        order: state.order.order
    })
    , {
        removeProductFromCart,
        createOrder,
        clearOrder
    })(Cart)