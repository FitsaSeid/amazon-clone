import React from 'react';
import CheckoutProducts from '../CheckoutProducts/CheckoutProducts';
import { useStateValue } from '../StateProvider';
import Subtotal from '../Subtotal/Subtotal';
import './Checkout.css';

function Checkout() {
    const [{ basket, user }, dispatch] = useStateValue();

    return (
        <div className='checkout'>
            <div className="checkout__left">
                <img className="checkout__ad" src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg" alt="" />
                <div >
                    <h3>Hello, {user?.email}</h3>
                    <h2 className='checkout__title'>You shopping basket</h2>

                    {
                        basket.map((item) => (
                            <CheckoutProducts
                                id={item.id}
                                title={item.title}
                                rating={item.rating}
                                img={item.img}
                                price={item.price} />
                        ))
                    }
                </div>



            </div>

            <div className="checkout_right">
                <Subtotal />
            </div>

        </div>
    )
}

export default Checkout