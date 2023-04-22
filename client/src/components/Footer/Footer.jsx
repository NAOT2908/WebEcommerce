import { FaLocationArrow, FaMobileAlt, FaEnvelope } from 'react-icons/fa';
import Payment from '../../assets/payments.png';
import { AiOutlineHeart } from 'react-icons/ai';
import React from "react";

import Banner from '../../assets/banner-headphone.png';

import "./Footer.scss";



const Footer = () => {



    return (
        <footer className='footer'>
            <div className="footer-content">
                <div className="col">
                    <div className="title">Giới thiệu</div>
                    <div className="text">Xin chân thành cảm ơn quý khách đã đến với chúng tôi </div>
                    <img src={Banner} alt="" style={{width : '200px', margin : '20px 30px 0 '}} />
                </div>
                <div className="col">
                    <div className="title">Liên hệ</div>
                    <div className="c-item">
                        <FaLocationArrow />
                        <div className="text">
                            Địa chỉ : Quan Hoa, Cầu Giấy, Hà Nội
                        </div>
                    </div>
                    <div className="c-item">
                        <FaMobileAlt />
                        <div className="text">
                            Điện thoại: 0987654321
                        </div>
                    </div>
                    <div className="c-item">
                        <FaEnvelope />
                        <div className="text">
                            Email: toannd.work@gmail.com
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="title">Danh mục</div>
                    <span className="text">Headphones</span>
                    <span className="text">Smart Watches</span>
                    <span className="text">Bluetooth Speakers</span>
                    <span className="text">Wireless Earbuds</span>
                    <span className="text">Home Theatre</span>
                    <span className="text">Projectors</span>
                </div>
                <div className="col">
                    <div className="title">Trang</div>
                    <span className="text">Trang chủ</span>
                    <span className="text">Giới thiệu</span>
                    <span className="text">Bảo mật và riêng tư</span>
                    <span className="text">Returns</span>
                    <span className="text">Điều khoản sử dụng</span>
                    <span className="text">Liên hệ với chúng tôi</span>
                </div>
            </div>
            <div className="bottom-bar">
                <div className="bottom-bar-content">
                    <span className="text">
                        Shop HEADPHONE 2023 CREATED BY NGUYỄN ĐỨC TOÀN
                        <AiOutlineHeart />
                    </span>
                    <img src={Payment} alt='' />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
