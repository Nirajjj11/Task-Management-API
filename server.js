const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const morgan = require("morgan")

dotenv.config()
connectDB()

const port = process.env.PORT
// console.log(port)

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))  // ✅ required

app.use(morgan('dev'))

// app.get("/",(req,res)=>{                                 // for test
//       res.send("Your message is getting")
// })

// app.post("/debug", (req, res) => {                       // for debug the code
//       console.log("BODY:", req.body)
//       res.json(req.body)
// })

app.use("/api/auth", require("./routes/authRoutes"))
app.use("/api/tasks", require("./routes/taskRoutes"))

app.listen(port,()=>{
      console.log(`Server is listening on port http://127.0.0.1:${port}`)
})



