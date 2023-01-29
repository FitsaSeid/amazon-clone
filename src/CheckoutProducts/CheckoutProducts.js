import React from 'react'
import { useStateValue } from '../StateProvider';
import './CheckoutProducts.css'
function CheckoutProducts({ img, title, price, rating, id }) {
    const [{ basket }, dispatch] = useStateValue();

    console.log("ID IS: " + id)

    const removeFromBasket = () => {
        dispatch({
            type: "REMOVE_FROM_BASKET",
            id: id,
        })
    }

    return (
        <div className='checkout__product'>
            <img
                className="checkout__product__image"
                src={img} alt=""
            />
            <div className="checkout__product__info">
                <p className="checkout__product__title">
                    {title}
                </p>
                <div className="checkout__product__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </div>
                <div className="checkout__product__rating">
                    {
                        Array(rating).fill().map(() => (
                            <p>⭐</p>
                        ))
                    }
                </div>
                <button className='checkout__product__button'
                    onClick={removeFromBasket}>
                    Remove from basket
                </button>
            </div>
        </div>
    )
}

export default CheckoutProducts;