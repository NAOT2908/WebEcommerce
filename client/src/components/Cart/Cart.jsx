import { MdClose } from 'react-icons/md'
import { BsCartX } from 'react-icons/bs'

import "./Cart.scss";
import CartItem from './CartItem/CartItem';
import { useContext } from 'react';
import { Context } from '../../utils/context';
import { formatNumber } from '../../utils/Numberformat';

import { loadStripe } from '@stripe/stripe-js'
import { makePaymentRequest } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const Cart = ({ setShowCart }) => {

    const { cartSubTotal, cartItems } = useContext(Context);
    const navigate = useNavigate();
    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);


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
        <div className='cart-panel'>
            <div className="opac-layer" onClick={() => setShowCart(false)} ></div>
            <div className="cart-content">
                <div className="cart-header">
                    <span className="heading">Giỏ hàng</span>
                    <span className="close-btn" onClick={() => setShowCart(false)}>
                        <MdClose />
                        <span className="text">Đóng</span>
                    </span>
                </div>

                {!!cartItems?.length && <>
                    <div className='cart-items'>

                        <CartItem />
                    </div>
                    <div className="cart-footer">
                        <div className="subtotal">
                            <span className="text">Tổng tiền :</span>
                            <span className="text total">{formatNumber(cartSubTotal)} VNĐ</span>
                        </div>
                        <div className="button">
                            <button className="checkout-cta" onClick={() => {
                                navigate('/shopcart');
                                setShowCart(false);
                            }} >Xem giỏ hàng</button>
                            <button className="checkout-cta" onClick={handlePayment}>Thanh toán</button>
                        </div>
                    </div>
                </>}

                {!cartItems?.length && <div className="empty-cart">
                    <BsCartX />
                    <span>Không có sản phẩm nào</span>
                    <button className='return-cta' onClick={() => { }} >Mua Ngay</button>
                </div>}

            </div>

        </div>
    );
};

export default Cart;
