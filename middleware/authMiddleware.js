// const jwt = require('jsonwebtoken')

// const authMiddleware = (req,res,next)=>{
//       const token = req.headers.authorization;

//       if (!token) return res.status(401).json({msg:"No token"})

//       try {
//             const decoded = jwt.verify(
//                   token, process.env.JWT_SECRET
//             )
//             req.user = decoded.id
//             next()
//       } catch (err){
//             res.send(401).json({msg : "Invalid token"})
//       }

// }

// module.exports = authMiddleware

// middleware/authMiddleware.js

const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
      const authHeader = req.headers.authorization

      if (!authHeader) {
            return res.status(401).json({ msg: "No token" })
      }

      const token = authHeader.split(" ")[1]

      try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = decoded.id   // ✅ THIS FIXES YOUR ISSUE
            next()
      } catch (err) {
            res.status(401).json({ msg: "Invalid token" })
      }
}