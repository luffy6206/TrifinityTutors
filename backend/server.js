const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const studentRoutes = require("./routes/studentRoutes")

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/trifinity")
.then(()=>console.log("MongoDB Connected"))

app.use("/api", studentRoutes)

app.listen(5000, ()=>{
  console.log("Server running on port 5000")
})