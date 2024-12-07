// import express from 'express';
// import jwt from 'jsonwebtoken';
// const router = express.Router();

// const authenticateToken = (req, res, next) => {
//     const token = req.cookies.jwt; // or from the headers if you prefer
  
//     if (!token) {
//       console.log('No token found. Unauthorized access.');
//       return res.status(401).json({ message: "Unauthorized: No token provided" });
//     }
  
//     jwt.verify(token, "secret", (err, decodedToken) => {
//       if (err) {
//         console.log('JWT verification error:', err.message);
//         return res.status(401).json({ message: "Unauthorized: Invalid token" });
//       }
  
//       req.user = decodedToken; 
//       next();
//     });
//   };
  

// export default router;
