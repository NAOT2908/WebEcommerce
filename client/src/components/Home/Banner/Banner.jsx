import "./Banner.scss";
import BannerImg from '../../../assets/banner-img.png';
import BannerImg1 from '../../../assets/Apple-Watch-Pro.jpg';


const Banner = () => {
    return (
        <div className="hero-banner">
            <div className="content">
                <div className="text-content">
                    <h1 data-text = "HEADPHONES" >HEADPHONES</h1>
                    <p>Chào mừng tới với shop</p>
                    <div className="ctas">
                        <div className="banner-cta">Đọc Thêm</div>
                        <div className="banner-cta v2"><a href="#product">Mua Ngay</a></div>
                    </div>
                </div>
                <img className="banner-img" src={BannerImg} alt="" />
                {/* <img className="banner-img1" src={BannerImg1} alt="" /> */}
            </div>
        </div>
    );
};

export default Banner;
