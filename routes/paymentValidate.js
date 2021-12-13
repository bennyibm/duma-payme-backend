const router = require('express').Router()
const axios = require('axios')

/*
* last step of the process
* send  a new payload to payment service after stripe payment succeed
* to validate the transaction and respond to show a success
* lite
* */

router.post("/api/validate", async (req,res)=>{
  const {reference, sendingAmount, paymentIntentId, receivingAmount, payerId, fee, senderExist, name, email, phone} = req.body
      try{
        console.log('Checking for validation ...', { reference, sendingAmount, paymentIntentId, receivingAmount, payerId, fee, senderExist, name, email, phone} )

      axios.post('http://192.168.1.101:8081/api/v1/icash/me/validate', {reference, sendingAmount, receivingAmount, paymentIntentId, payerId, fee, senderExist, name, email, phone})
      .then((response) => {
       console.log('Here is the validation result...')
       console.log(response.data)
       res.json(response.data)
    })

    }catch(error){
      console.log(error)
      res.json({message:error})
    }

})

module.exports = router


/*
* payment validation
* orderid, value, currency, customerId, callback url
* amount, */


//if status is succeed call the callback url and append orderId and status
