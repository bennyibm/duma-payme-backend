const router = require('express').Router()
const axios = require('axios')

/*
* This is the initial endpoint that gets called as soon as the user hits the link and while the form loads
* the first step is to retrieve the user ip,
* then set a payload along together with admin and payer id from the body request
* and finally send that payload to the payment service
* which returns infos such as currency, admin logo to use in the form
*
* */

let clientIp =''

router.post("/api/payment-init", async (req,res)=>{

  await axios.get('https://geolocation-db.com/json')
  .then(response =>{
     clientIp = response.data.IPv4

  })
  const ip = clientIp
  const adminId= req.body.adminId
  const payerId = req.body.payerId
  const paymentInfo = { ip, adminId, payerId }


      try{
    console.log('payment init info ===>', paymentInfo)

      axios.post('http://192.168.1.101:8081/api/v1/icash/me/init', paymentInfo)
      .then((response) => {
        res.json(response.data)
        console.log('We initialized the payment, fill the form to payout...')
        console.log(response.data)
    })

    }catch(error){
      console.log('error on init ===>', error)
      res.json({status:'init has failed',message:error})
    }



})


module.exports = router
