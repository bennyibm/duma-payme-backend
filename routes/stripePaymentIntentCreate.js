const router = require('express').Router()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

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
    console.log(error)
    res.status(500).json({statusCode: 500, message:error.message})
  }
})

module.exports = router