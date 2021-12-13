const router = require('express').Router()
const axios = require('axios')

let clientIp =''


router.post("/api/payment-redirect", async (req,res)=>{
    await axios.get('https://geolocation-db.com/json')
        .then(response =>{
            clientIp = response.data.IPv4
            // console.log('Ip adress ===>:', clientIp)
        })
    const ip = clientIp
    const adminId = req.body.adminId
    const currency = req.body.currency
    const amount = req.body.amount
    const cbUrl = req.body.cbUrl
    const paymentdata = { ip, adminId, currency,amount, cbUrl }
    if(req.body.ip === undefined  && req.body.adminId === undefined && req.body.currency ===undefined && req.body.amount === undefined && req.body.cbUrl === undefined  ){
        console.log('Unable to init a payment because of empty payload...')
    }else{
        try{
            console.log('payment from the client application ===>', paymentdata )

            axios.post('http://192.168.1.101:8081/api/v1/icash/me/redirect', paymentdata)
                .then((response) => {
                    res.json(response.data)
                    console.log('We initialized the payment, fill the form to payout...')
                    console.log(response.data)
                })

        }catch(error){
            console.log('error on init ===>', error)
            res.json({status:'init has failed',message:error})
        }

    }

})


module.exports = router
