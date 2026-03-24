const User = require("../models/user")
const bcrypt = require("bcryptjs")
const generateToken = require("../utils/generateToken")

// Register 

exports.register = async (req, res) => {
      const { email, password } = req.body

      const hashed = await bcrypt.hash(password, 10)

      const user = await User.create({
            email, password: hashed
      })

      res.json({ token: generateToken(user._id) })
}

// Login

exports.login = async (req,res)=>{
      console.log("BODY : " ,req.body)            // Yaha par jo aana tha wo nahi aa raha
      const {email , password} = req.body;        // or yaha par kahali aa raha 

      const user = await User.findOne({email})

      if (!user) return res.status(400).json({msg :"User not found"})

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) return res.status(400).json({msg: "Wrong password !"})

      res.json({token : generateToken(user._id)})

}


// exports.login = async (req, res) => {
//       console.log("BODY:", req.body)

//       if (!req.body) {
//             return res.status(400).json({ msg: "Body is missing" })
//       }

//       const { email, password } = req.body

//       if (!email || !password) {
//             return res.status(400).json({ msg: "Email and password required" })
//       }

//       const user = await User.findOne({ email })

//       if (!user) return res.status(400).json({ msg: "User not found" })

//       const isMatch = await bcrypt.compare(password, user.password)

//       if (!isMatch) return res.status(400).json({ msg: "Wrong password !" })

//       res.json({ token: generateToken(user._id) })
// }