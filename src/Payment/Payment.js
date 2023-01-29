import React, { useEffect, useState } from 'react';
import './Payment.css';
import { useStateValue } from '../StateProvider';
import CheckoutProducts from '../CheckoutProducts/CheckoutProducts';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from '../reducer';
import axios from '../axios';


const Payment = () => {
    const [{ basket, user }, dispatch] = useStateValue();

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [clientSecret, setClientSecret] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });

            setClientSecret(response.data.clientSecret);
        }
        getClientSecret();
    }, [basket])

    console.log("Client secret is: ", clientSecret);

    // console.log(basket)

    const strip = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        // strip processing
        e.preventDefault();
        setProcessing(true);

        const payload = await strip.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            //paymentIntent means payment confirmation 
            setSucceeded(true);
            setProcessing(false);
            setError(null);

            navigate("/order")
        })
    }

    const handleChange = (e) => {
        //Listen change and also display an error
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "");
    }

    return (
        <div className="payment">
            <div className="payment__container">
                <h1>Checkout <Link to="/checkout">({basket?.length} items) </Link></h1>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>127 street</p>
                        <p>Bahir Dar, Ethiopia</p>
                    </div>
                </div>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review item and delivery</h3>
                    </div>
                    <div className="payment__items">
                        {
                            basket?.map((item) => (
                                <CheckoutProducts
                                    id={item.id}
                                    title={item.title}
                                    img={item.img}
                                    price={item.price}
                                    rating={item.rating} />
                            ))
                        }

                    </div>

                </div>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Methods</h3>
                    </div>

                    <div className="payment__details">
                        <form onSubmit={handleSubmit} action="">
                            <CardElement onChange={handleChange} />
                            <div className="payment__price">
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <h3>Order Total: {value}</h3>
                                    )}

                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing </p> : <p>Buy Now</p>}</span>
                                </button>
                            </div>
                            {error && <div>{error}</div>}
                        </form>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default Payment;
