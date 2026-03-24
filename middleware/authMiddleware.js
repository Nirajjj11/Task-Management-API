// const jwt = require("jsonwebtoken")

// const authMiddleware = (req, res, next) => {
//       const authHeader = req.headers.authorization

//       console.log("HEADER:", authHeader); // 👈 DEBUG

//       // 🔴 Check token exists
//       if (!authHeader || !authHeader.startsWith("Bearer ")) {
//             return res.status(401).json({ msg: "No token provided" })
//       }

//       const token = authHeader.split(" ")[1]

//       try {
//             const decoded = jwt.verify(token, process.env.JWT_SECRET)

//             // ✅ IMPORTANT: match your token payload
//             req.user = decoded.id

//             next()
//       } catch (err) {
//             return res.status(401).json({ msg: "Invalid token" })
//       }
// }

// module.exports = authMiddleware

const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
      const authHeader = req.headers.authorization;

      console.log("HEADER:", authHeader);

      if (!authHeader) {
            return res.status(401).json({ msg: "No token provided" });
      }

      try {
            const token = authHeader.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            console.log("DECODED:", decoded);  // 👈 IMPORTANT

            req.user = decoded.id;   // 👈 MUST be id

            next();
      } catch (err) {
            res.status(401).json({ msg: "Invalid token" });
      }
};

module.exports = authMiddleware;