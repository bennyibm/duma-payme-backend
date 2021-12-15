const router = require('express').Router()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)


/*
* Endpoint that capture the form pay button
* retrieve amount and currency to create stripe payment intent
* http://192.168.1.115:3000/?adminId=61b086378fd8086af11fdd33
* */

router.post("/api/create-payment-intent", async(req,res)=>{


  try{
    const { amount, currency,
      // receipt_email
    } = req.body
    console.log('Trying to create a stripe payment intent...')

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: currency,
      // receipt_email: receipt_email
    })

    res.status(200).send(paymentIntent.client_secret)
    console.log('Stripe payment intent created...')

  }catch(error){
    console.log("Error on stripe", error)
    res.status(500).json({statusCode: 500, message:error.message})
  }
})

module.exports = router
