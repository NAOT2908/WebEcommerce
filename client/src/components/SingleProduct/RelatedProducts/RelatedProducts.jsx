import useFetch from "../../../hooks/useFetch";
import Products from "../../Products/Products";
import React from "react";


const RelatedProducts = ({productId, categoryId}) => {

    const { data } = useFetch(`/api/products?populate=*&filters[id][$ne]=${productId}&filters[categories][id]=${categoryId}&pagination[start]=0&pagination[limit]=4`);


    return (
    <div className="related-products">
        <Products headingText={'Sản phẩm liên quan'} products={data} />
    </div>
    );
};

export default RelatedProducts;
