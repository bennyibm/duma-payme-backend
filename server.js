require('dotenv').config({path:'./.env'})
const express = require('express')
const stripeRoute = require('./routes/stripePaymentIntentCreate')
const paymentInit = require('./routes/paymentInit')
const paymentValidate = require('./routes/paymentValidate')

const server = express()
server.use(express.static("."));
server.use(express.json())
server.use('/', stripeRoute)
server.use('/', paymentInit)
server.use('/', paymentValidate)

const port = 5000;

server.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});