import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log('Checking for JWT token in cookies');

  if (token) {
    console.log('Token found, verifying...');
    jwt.verify(token, "secret", (err, decodedToken) => {
      if (err) {
        console.log('JWT verification error:', err.message);
        res.redirect("/login");
      } else {
        console.log('Token verified successfully. Decoded Token:', decodedToken);
        req.user = decodedToken;
        next();
      }
    });
  } else {
    console.log('No token found. Redirecting to login.');
    res.redirect("/login");
  }
};

//authenticate token
const getCookie = (req, cookieName) => {
  const cookies = req.cookies;
  return cookies[cookieName] || null;
};

const authenticateToken = (req, res, next) => {
  const token = getCookie(req, 'jwt');
  console.log('Checking for JWT token in cookies:', token);
  if (!token) {
    console.log('No token found. Unauthorized access.');
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
  jwt.verify(token, "secret", (err, decodedToken) => {
    if (err) {
      console.log('JWT verification error:', err.message);
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    req.user = decodedToken;
    console.log('Token verified successfully:', req.user);
    next();
  });
};


const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log('Checking user based on JWT token');

  if (token) {
    jwt.verify(token, "secret", async (err, decodedToken) => {
      if (err) {
        console.log('JWT verification error:', err.message);
        res.locals.user = null;
        next();
      } else {
        console.log('Token verified. Decoded Token:', decodedToken);
        let user = await User.findById(decodedToken.id);
        console.log('User fetched from database:', user);
        res.locals.user = user;
        next();
      }
    });
  } else {
    console.log('No JWT token found, setting user to null');
    res.locals.user = null;
    next();
  }
};

export { requireAuth, checkUser, authenticateToken, getCookie };
