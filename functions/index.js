const functions = require("firebase-functions");

const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_51MMjWpKkJFgr7SA0duWmCcg441zmtdKIcwrdOy7y5NPeKbB48QpRdjBHtQ03uEtfq23L0KF9OfO8EfcLzytrG4Ec00F8cE7YOh');

//API

//App config
const app = express();

//Middlewares

app.use(cors({ origin: true }));
app.use(express.json());


//API Routes

app.get('/', (req, res) => {
    res.status(200).send("Hello World")
});

app.post('/payments/create/', async (req, res) => {
    const total = req.query.total;

    console.log("Payment request received: ", total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd"
    });

    //201 means OK and something was created
    res.status(201).send({
        clientSecret: paymentIntent.client_secret,

    })
})

//Listen command

exports.api = functions.https.onRequest(app);

