import React from 'react';
import { useStateValue } from '../StateProvider';
import './Product.css'

function Product({ title, price, img, rating, id }) {
    const [{ basket }, dispatch] = useStateValue();


    const addToBasket = () => {

        dispatch({
            type: "ADD_TO_BASKET",
            item: {
                id: id,
                title: title,
                price: price,
                img: img,
                rating: rating
            },
        });

    }
    return (
        <div className='product'>
            <div className="product__information">
                <p>{title}</p>
                <small>$</small>
                <strong>{price}</strong>

                <div className="product__rating">
                    {
                        Array(rating).fill().map((_, i) => (
                            <p>⭐</p>
                        ))
                    }
                </div>
            </div>
            <img
                src={img}
                alt=""
                className="product__img" />
            <button onClick={addToBasket}>Add to cart</button>
        </div>
    );
}

export default Product;
