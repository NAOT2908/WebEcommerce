import RelatedProducts from "./RelatedProducts/RelatedProducts";
import "./SingleProduct.scss";
import { useContext, useState } from "react";
import { Context } from "../../utils/context";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { formatNumber } from "../../utils/Numberformat";

import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedinIn,
    FaPinterest,
    FaCartPlus
} from "react-icons/fa";

const SingleProduct = () => {
    const [quantity, setQuantity] = useState(1);
    const { handleAddToCart } = useContext(Context);
    const { id } = useParams();
    const { data } = useFetch(`/api/products?populate=*&[filters][id]=${id}`);

    const decrement = () => {
        setQuantity((prevState) => {
            if (prevState === 1) return 1;
            return prevState - 1;
        });
    };
    const increment = () => {
        setQuantity((prevState) => prevState + 1);
    };


    if (!data) return;
    const product = data?.data?.[0]?.attributes
    return (
        <div className="single-product-main">
            <div className="layout">
                <div className="single-product">
                    <div className="left">

                        <img src={process.env.REACT_APP_DEV_URL + product.img.data[0].attributes.url} alt="" />
                    </div>
                    <div className="right">
                        <span className="name">{product.title}</span>
                        <span className="price">{formatNumber(product.price)} VNĐ</span>
                        <span className="desc">{product.desc}</span>
                        <div className="cart-buttons">
                            <div className="quantity-buttons">
                                <span onClick={decrement}>-</span>
                                <span>{quantity}</span>
                                <span onClick={increment}>+</span>
                            </div>
                            <button className="addcart-button" onClick={() => {
                                handleAddToCart(data.data[0], quantity)
                                setQuantity(1)
                            }}>
                                <FaCartPlus size={20} />
                                
                                Thêm giỏ hàng
                            </button>
                        </div>
                        <span className="divider"></span>
                        <div className="info-item">
                            <span className="text-bold">
                                Danh mục :
                                <span> {product.categories.data[0].attributes.title}</span>
                            </span>
                            <span className="text-bold">
                                Share:
                                <span className="social-icons">
                                    <FaFacebookF size={16} />
                                    <FaInstagram size={16} />
                                    <FaTwitter size={16} />
                                    <FaLinkedinIn size={16} />
                                    <FaPinterest size={16} />

                                </span>
                            </span>
                        </div>

                    </div>
                </div>

                <RelatedProducts productId={id} categoryId={product.categories.data[0].id} />
            </div>

        </div>
    );
};

export default SingleProduct;
