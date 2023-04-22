import "./Banner.scss";
import BannerImg from '../../../assets/banner-img.png';
import BannerImg1 from '../../../assets/Apple-Watch-Pro.jpg';


const Banner = () => {
    return (
        <div className="hero-banner">
            <div className="content">
                <div className="text-content">
                    {/* <h1>HEADPHONES</h1> */}
                    <h1>
                        <span className="char1">H</span>
                        <span className="char2">E</span>
                        <span className="char3">A</span>
                        <span className="char4">D</span>
                        <span className="char5">P</span>
                        <span className="char6">H</span>
                        <span className="char7">O</span>
                        <span className="char8">N</span>
                        <span className="char9">E</span>
                        <span className="char9">S</span>
                    </h1>
                    <p>Chào mừng tới với shop</p>
                    <div className="ctas">
                        <div className="banner-cta">Đọc Thêm</div>
                        <div className="banner-cta v2">Mua Ngay</div>
                    </div>
                </div>
                <img className="banner-img" src={BannerImg} alt="" />
                {/* <img className="banner-img1" src={BannerImg1} alt="" /> */}
            </div>
        </div>
    );
};

export default Banner;
