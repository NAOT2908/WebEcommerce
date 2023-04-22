import "./Products.scss";
import Product from "./Product/Product";

const Products = ({ products, innerPage, headingText }) => {
    
    return (
        <div className="products-container">
            {!innerPage && <div className="sec-heading">{headingText}</div>}
            <div className={`products ${innerPage ? "innerPage" : ""}`}>
                {products?.data?.map((p) => {
                    return (
                        <Product
                            key={p.id}
                            id={p.id}
                            data={p.attributes}

                        />)
                })}


            </div>
        </div>
    );
};

export default Products;
