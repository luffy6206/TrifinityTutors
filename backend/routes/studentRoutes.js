const express = require("express")
const router = express.Router()

const StudentRequest = require("../models/StudentRequest")

router.post("/student", async (req,res)=>{

  const data = new StudentRequest(req.body)

  await data.save()

  res.json({message:"Student request saved"})

})

module.exports = router