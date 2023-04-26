import Products from "../Products/Products";
import { useNavigate, useParams } from "react-router-dom";
import "./Category.scss";
import useFetch from "../../hooks/useFetch";
import { useContext } from "react";
import { Context } from "../../utils/context";


const Category = () => {
    const { products, setProducts, categories, setCategories } =
        useContext(Context);
    const { id } = useParams();
    const navigate = useNavigate();

    const { data } = useFetch(`/api/products?populate=*&[filters][categories][id]=${id}`);


    return (
        <div>
            <div className="shop-category">
                <div className="categoriess">
                    {categories?.data?.map((item) =>
                    (
                        <div
                            key={item.id}
                            className="category"
                            onClick={() => navigate(`/category/${item.id}`)}
                        >
                            <img
                                src={process.env.REACT_APP_DEV_URL + item.attributes.img.data.attributes.url}
                                alt="" />
                        </div>
                    ))}
                </div>
            </div>
            <div className="category-main-content">
                <div className="layout">
                    <div className="category-title">
                        {data?.data?.[0]?.attributes?.categories?.data?.[0]?.attributes?.title}
                    </div>
                    <Products innerPage={true} products={data} />
                </div>
            </div>
        </div>
    );

};

export default Category;
