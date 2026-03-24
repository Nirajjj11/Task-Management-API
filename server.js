const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./config/db")

dotenv.config()
connectDB()


const port = process.env.PORT
// console.log(port)

const app = express();
app.use(express.json())

app.get((req,res)=>{
      res.send("Your message is getting")
})


app.listen(port,()=>{
      console.log(`Server is listening on port http://localhost:${port}`)
})



