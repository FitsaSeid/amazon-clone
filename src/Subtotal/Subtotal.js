import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from '../StateProvider';
import { getBasketTotal } from "../reducer";
import './Subtotal.css'
import { useNavigate } from 'react-router-dom';

function Subtotal() {
    const [{ basket }, dispatch] = useStateValue();
    const navigate = useNavigate();

    return (
        <div className='subtotal'>
            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <p>
                            Subtotal({basket.length} items): <strong>
                                {value}
                            </strong>
                        </p>
                        <small className='subtotal__gift'>
                            <input type="checkbox" />
                            This order contains a gift
                        </small>
                    </>
                )}

                decimalScale={2}
                value={getBasketTotal(basket)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />
            <button className='subclass__button' onClick={() => navigate("/payment")}>Proceed to checkout</button>
        </div>

    )
}

export default Subtotal