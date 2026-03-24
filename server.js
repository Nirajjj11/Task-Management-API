const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./config/db")

dotenv.config()
connectDB()


const port = process.env.PORT
// console.log(port)

const app = express();
app.use(express.json())

// app.get("/",(req,res)=>{                                 // for test
//       res.send("Your message is getting")
// })

app.use("/api/auth", require("./routes/authRoutes"))
app.use("/api/tasks", require("./routes/taskRoutes"))


app.listen(port,()=>{
      console.log(`Server is listening on port http://127.0.0.1:${port}`)
})



