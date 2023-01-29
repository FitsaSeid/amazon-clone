import React from 'react';
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Link } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import { auth } from '../firebase'

function Header() {
    const [{ basket, user }, dispatch] = useStateValue();

    const authenticationHandler = () => {
        if (user) {
            auth.signOut();
        }
        else {

        }
    }


    return (
        <div className='header'>
            <Link to="/">
                <img
                    className="header__logo"
                    src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                    alt=""
                />
            </Link>

            <div className="header__search">
                <input
                    className="header__search__input"
                    type="text" />
                <SearchIcon
                    className="header__search_icon" />
            </div>

            <div className="header__nav">

                <Link onClick={authenticationHandler} className='Link' to={!user && "/login"}>
                    <div className="header__option">
                        <span className="header__option__line1">
                            Hello, {user ? user.email : " guest"}
                        </span>
                        <span className="header__option__line2">
                            {user ? "Sign Out" : "Sign In"}
                        </span>
                    </div>
                </Link>
                <div className="header__option">
                    <span className="header__option__line1">
                        Returns
                    </span>
                    <span className="header__option__line2">
                        & Orders
                    </span>
                </div>
                <div className="header__option">
                    <span className="header__option__line1">
                        Your
                    </span>
                    <span className="header__option__line2">
                        Prime
                    </span>
                </div>


                <Link className='Link' to="/checkout">
                    <div className="header__basket">
                        <ShoppingBasketIcon />
                        <span
                            className="header__basket__count header__option__line2">
                            {basket.length}

                        </span>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Header;