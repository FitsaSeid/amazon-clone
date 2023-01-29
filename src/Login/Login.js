import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import './Login.css'

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const signIn = (e) => {
        e.preventDefault();

        auth.signInWithEmailAndPassword(email, password)
            .then((auth) => {
                if (auth) navigate('/');
            })
            .catch(err => alert(err.message))
    }

    const signUp = (e) => {
        e.preventDefault();

        auth.createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                //successfully registered
                // console.log(auth)

                if (auth) navigate('/');
            })
            .catch(err => alert(err.message))
    }

    return (
        <div className='login '>
            <Link to='/'>
                <img
                    className="login__logo"
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'
                />
            </Link>

            <div className="login__container">
                <h1>Sign In</h1>
                <form action="">

                    <h5>E-mail </h5>
                    <input
                        type="email"
                        value={email}
                        onChange={
                            e => setEmail(e.target.value)
                        }
                    />

                    <h5>password </h5>

                    <input
                        type="password"
                        value={password}
                        onChange={
                            e => setPassword(e.target.value)
                        }
                    />

                    <button type='submit' onClick={signIn} className='login__signIn_button'>Sign In</button>
                </form>

                <p>By signing-in you agree to Amazon's clone Conditions of use & Sale. Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.</p>

                <button onClick={signUp} className='login__signUp_button'>Create Amazon clone account</button>
            </div>
        </div>
    )
}

export default Login