const router = require('express').Router()
const axios = require('axios')

/*
* last step of the process
* send  a new payload to payment service after stripe payment succeed
* to validate the transaction and respond to show a success */

router.post("/api/validate", async (req,res)=>{
  const {reference, sendingAmount, paymentIntentId, receivingAmount, payerId, fee} = req.body
      try{
        console.log('Checking for validation ...', { reference, sendingAmount, paymentIntentId, receivingAmount, payerId, fee} )

      axios.post('http://18.200.191.178:8081/api/v1/icash/me/validate', {reference, sendingAmount, receivingAmount, paymentIntentId, payerId, fee})
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
