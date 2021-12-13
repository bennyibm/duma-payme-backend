// const router = require('express').Router()
// const axios = require('axios')
//
//
// router.post("/api/payment", async (req, res ) =>{
//
//     const payerId = req.body.payerId
//     try{
//         await axios.post("http://192.168.1.101:9292/api/v1/payment", payerId).then((response)=>{
//             res.send(response.data)
//             console.log('Retrieving purchase object by payerId...')
//             console.log(response.data)
//         })
//     }catch(error){
//         console.log('error on retrieving purchase object ===>', error)
//         res.json({status:'retrieving has failed',message:error})
//
//
//     }
//
//
//
// })
//
// module.exports = router
//
//
//
//
//
//
//
