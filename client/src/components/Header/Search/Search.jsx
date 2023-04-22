import "./Search.scss";
import { MdClose } from 'react-icons/md'
import pro1 from "../../../assets/products/watch-prod-1.webp";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom'
import useFetch from "../../../hooks/useFetch";


const Search = ({ setShowSearch }) => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const [focusedIndex, setFocusedIndex] = useState(0);
    const resultRefs = useRef([]);
    const [focusedItem, setFocusedItem] = useState(null);
    const firstProductRef = useRef(null)
    const onchange = (e) => {
        setQuery(e.target.value);
    }
    let { data } = useFetch(`/api/products?populate=*&filters[title][$contains]=${query}`);

    if (!query.length) {
        data = null;
    }
    useEffect(() => {
        if (data?.data?.length) {
            resultRefs.current[focusedIndex].focus(); // Focus vào sản phẩm đầu tiên
            // setFocusedIndex(0)
        }
    }, [data, focusedIndex]);

    // const handleKeyDown = (e) => {
    //     if (e.key === "ArrowUp") {
    //         e.preventDefault();
    //         setFocusedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    //     } else if (e.key === "ArrowDown") {
    //         e.preventDefault();
    //         setFocusedIndex((prevIndex) =>
    //             prevIndex < resultRefs.current.length - 1 ? prevIndex + 1 : prevIndex
    //         );
    //     }
    // };
    const handleKeyDown = (e, prevIndex) => {
        if (e.key === "ArrowUp") {
            e.preventDefault();
            setFocusedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : resultRefs.current.length - 1));
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            setFocusedIndex((prevIndex) => (prevIndex < resultRefs.current.length - 1 ? prevIndex + 1 : 0));
        }
    };
    const handleClick = (e, productId) => {
        if (e.key === "Enter") {
            navigate("/product/" + productId);
            setShowSearch(false);
        }

    }



    return (
        <div className="search-modal">
            <div className="form-field">
                <input

                    autoFocus
                    type="text"
                    placeholder="Tìm kiếm sản phẩm"
                    value={query}
                    onChange={onchange}
                />
                <MdClose
                    className="close-btn"
                    onClick={() => setShowSearch(false)}
                />
            </div>
            <div className="search-result-content" onKeyDown={handleKeyDown}
            >
                {!data?.data?.length && (
                    <div className="start-msg">
                        Nhập tên sản phẩm mà bạn muốn tìm kiếm vào đây.
                    </div>
                )}
                <div className="search-results" >
                    {data?.data?.map((item, index) => {

                        return (
                            <div
                                className="search-result-item"
                                tabIndex={0}
                                key={item.id}
                                ref={(el) => (resultRefs.current[index] = el)}
                                style={{
                                    backgroundColor: index === focusedIndex ? "rgb(67, 172, 253)" : "transparent",
                                }}

                                onKeyDown={(e) => {
                                    handleClick(e, item.id)
                                    // navigate("/product/" + item.id);
                                    // setShowSearch(false);
                                }}
                                onClick={() => {
                                    
                                    navigate("/product/" + item.id);
                                    setShowSearch(false);
                                }}
                            >
                                <div className="image-container">
                                    <img
                                        src={
                                            process.env.REACT_APP_DEV_URL + item.attributes.img.data[0].attributes.url
                                        }
                                    />
                                </div>
                                <div className="prod-details">
                                    <span className="name">
                                        {item.attributes.title}
                                    </span>
                                    <span className="desc">
                                        {item.attributes.desc}
                                    </span>
                                </div>
                            </div>
                        )
                    }
                    )}
                </div>
            </div>
        </div>
    );
};

export default Search;
