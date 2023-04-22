import "./CartItem.scss";
import { MdClose } from "react-icons/md";
import pro from '../../../assets/products/watch-prod-1.webp'
import { useContext, useState } from "react";
import { Context } from "../../../utils/context";
import { formatNumber } from "../../../utils/Numberformat";


const CartItem = ({ }) => {
    const { cartItems, handleRemoveFromCart, handleCartProductQuantity } = useContext(Context);
    const [isIncreasing, setIsIncreasing] = useState(false);
    const [isDecreasing, setIsDecreasing] = useState(false);
    const [incrementIntervalId, setIncrementIntervalId] = useState(false);

    const handleIncreaseStart = (item) => {
        setIsIncreasing(true);
        const intervalId = setInterval(() => {
            handleCartProductQuantity('inc', item);
        }, 150);
        setIncrementIntervalId(intervalId);
    }
    const handleIncreaseEnd = (item) => {
        setIsDecreasing(true);
        const intervalId = setInterval(() => {
            handleCartProductQuantity('dec', item);
        }, 150);
        setIncrementIntervalId(intervalId);
    }

    const handleIncreaseStop = () => {
        setIsIncreasing(false);
        setIsDecreasing(false);
        clearInterval(incrementIntervalId);
    }

    
    return (
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
                                onClick={() => handleCartProductQuantity('inc', item)}>+</span>
                        </div>
                        <div className="text">
                            <span>x</span>
                            <span>{item.attributes.quantity}</span>
                            <span className="hightlight"> : {formatNumber(item.attributes.price * item.attributes.quantity)} VND</span>
                        </div>
                    </div>
                    <MdClose className="close-btn" onClick={() => handleRemoveFromCart(item)} />
                </div>))

            }
        </div>
    );
};

export default CartItem;
