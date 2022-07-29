const express = require("express")
const router = express.Router()
const cors = require('cors')

// router.get(url, call back func with params request and response)
router.get('/', (req, res)=>{
    res.send("Server is Running ! ")
})

module.export = router