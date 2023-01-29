import './App.css';
import Header from "./Header/Header.js"
import Home from './Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Checkout from './CheckOut/Checkout';
import React, { useEffect } from 'react';
import Login from './Login/Login';
import 'firebase/compat/auth';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import Payment from './Payment/Payment'
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useElements, useStripe } from '@stripe/react-stripe-js';

const promise = loadStripe('pk_test_51MMjWpKkJFgr7SA03IeZrefn9qw5GE6SgOBhPeBWJgjxn9uXOEgVfHdzkuqiqtKTc7qhOak6wgJE9vXkF7o6DbUv006iKj288f');


function App() {
  const [{ basket }, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("User is ", authUser);
      if (authUser) {
        //user is logged in
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      }
      else {
        dispatch({
          type: 'SET_USER',
          user: null,
        })
        //user is logged out
      }
    })
  }, [])

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path='/' element={[<Header />, <Home />]} />
          <Route path='/checkout' element={[<Header />, <Checkout />]} />

          <Route path='/login' element={[<Login />]} />
          <Route path='/payment'
            element={
              [<Header />,
              <Elements stripe={promise}>
                <Payment />
              </Elements>]} />

          <Route path='*' element="404 NOT FOUND" />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
