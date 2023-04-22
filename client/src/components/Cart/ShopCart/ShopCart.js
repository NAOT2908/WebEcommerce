import React, { useState } from 'react'
import './ShopCart.scss'
import { MdClose } from "react-icons/md";
import { useContext } from "react";
import { Context } from "../../../utils/context";
import { formatNumber } from "../../../utils/Numberformat";
import { BsCartX, BsTypeH1 } from 'react-icons/bs';
import CartItem from '../CartItem/CartItem';
import { makePaymentRequest } from '../../../utils/api';
import { loadStripe } from '@stripe/stripe-js';
import Cart from '../Cart';
import { useNavigate } from 'react-router-dom';


export const ShopCart = () => {
    const { cartItems, handleRemoveFromCart, handleCartProductQuantity, cartSubTotal } = useContext(Context);
    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
    const navigate = useNavigate();
    const [isIncreasing, setIsIncreasing] = useState(false);
    const [isDecreasing, setIsDecreasing] = useState(false);
    const [incrementIntervalId, setIncrementIntervalId] = useState(false);

    const handleIncreaseStart = (item) => {
        setIsIncreasing(true);
        const intervalId = setInterval(() => {
            handleCartProductQuantity('inc', item);
        }, 200);
        setIncrementIntervalId(intervalId);
    }
    const handleIncreaseEnd = (item) => {
        setIsDecreasing(true);
        const intervalId = setInterval(() => {
            handleCartProductQuantity('dec', item);
        }, 200);
        setIncrementIntervalId(intervalId);
    }

    const handleIncreaseStop = () => {
        setIsIncreasing(false);
        setIsDecreasing(false);
        clearInterval(incrementIntervalId);
    }

    // console.log(cartItems)
    const handlePayment = async () => {
        try {
            const stripe = await stripePromise;
            const res = await makePaymentRequest.post("/api/orders", {
                products: cartItems,
            });
            await stripe.redirectToCheckout({
                sessionId: res.data.stripeSession.id,
            });
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div>
            <div className='shopcart'>
                <h1>Giỏ hàng của bạn</h1>
                <div className="cart-products">
                    {cartItems.map((item) => (
                        <div key={item.id} className="cart-product">
                            <div className="img-container">
                                <img src={process.env.REACT_APP_DEV_URL + item.attributes.img.data[0].attributes.url} alt="" />
                            </div>
                            <div className="prod-details">
                                <span className="name">{item.attributes.title}</span>

                                <div className="quantity-buttons">
                                    <span onMouseDown={() => handleIncreaseEnd(item)}
                                        onMouseUp={handleIncreaseStop}
                                        onTouchStart={() => handleIncreaseEnd(item)}
                                        onTouchEnd={handleIncreaseStop}
                                        onClick={() => handleCartProductQuantity('dec', item)}
                                        >-</span>
                                    <span>{item.attributes.quantity}</span>
                                    <span onMouseDown={() => handleIncreaseStart(item)}
                                        onMouseUp={handleIncreaseStop}
                                        onTouchStart={() => handleIncreaseStart(item)}
                                        onTouchEnd={handleIncreaseStop}
                                        onClick={() => handleCartProductQuantity('inc', item)}
                                        >+</span>
                                </div>
                                <div className="texts">
                                    <span>{item.attributes.price} VNĐ</span>
                                    <span className="hightlights"> : {formatNumber(item.attributes.price * item.attributes.quantity)} VND</span>
                                </div>
                            </div>
                            <MdClose className="close-btn" onClick={() => handleRemoveFromCart(item)} />
                        </div>

                    ))
                    }
                    <div className="cart-footer">
                        <div className="subtotal">
                            <span className="text">Tổng tiền :</span>
                            <span className="text total">{formatNumber(cartSubTotal)} VNĐ</span>
                        </div>
                        <div className="button">

                            <button className="checkout-cta" onClick={handlePayment} >Thanh toán</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
