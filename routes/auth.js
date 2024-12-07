import { Router } from "express";
import {
  signup_get,
  signup_post,
  login_get,
  login_post,
  logout_get
} from "../controllers/user.js";
import { requireAuth } from '../middleware/authMiddleware.js';
import User from "../models/user.js";

const router = Router();

router.get("/signup", (req, res) => {
  console.log('GET /signup request received');
  signup_get(req, res);
});

router.post("/signup", (req, res) => {
  console.log('POST /signup request received with data:', req.body);
  signup_post(req, res);
});

router.get("/login", (req, res) => {
  console.log('GET /login request received');
  login_get(req, res);
});

router.post("/login", (req, res) => {
  console.log('POST /login request received with data:', req.body);
  login_post(req, res);
});

router.get("/logout", (req, res) => {
  console.log('GET /logout request received');
  logout_get(req, res);
});

router.get('/user', requireAuth, async (req, res) => {
  console.log('GET /user request received. Fetching user details...');
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ error: 'User not found' });
    }
    console.log('User found:', user);
    res.json({ user: { id: user._id, name: user.name } });
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
