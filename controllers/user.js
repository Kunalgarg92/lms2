import User from "../models/user.js";
import jwt from 'jsonwebtoken';

const handleError = (err) => {
  console.log('Error encountered:', err.message, err.code);
  let errors = { name: "", email: "", password: "" };

  if (err.message == 'incorrect email') {
    errors.email = "Incorrect email";
  }

  if (err.message == 'incorrect password') {
    errors.password = "Incorrect password";
  }

  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      console.log(`Validation error on ${properties.path}: ${properties.message}`);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id, name) => {
  console.log(`Creating JWT token for user ID: ${id}`);
  return jwt.sign({ id, name }, 'secret', { expiresIn: maxAge });
};

export const signup_post = async (req, res) => {
  const { name, email, password } = req.body;
  console.log("Signup request received with data:", { name, email, password });

  try {
    const user = await User.create({ name, email, password });
    console.log('User created successfully:', user);

    const token = createToken(user._id, user.name);
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'Lax' // Adjust according to your requirements
    });
    console.log(`JWT token sent in cookie for user: ${user._id}`);

    res.status(201).json({ user: { id: user._id, name: user.name } });
  } catch (err) {
    const errors = handleError(err);
    console.log('Signup failed with errors:', errors);
    res.status(400).json({ errors });
  }
};

export const login_post = async (req, res) => {
  const { email, password } = req.body;
  console.log("Login request received with email:", email);

  try {
    const user = await User.login(email, password);
    console.log('Login successful for user:', user);

    const token = createToken(user._id, user.name);
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'Lax' // Adjust according to your requirements
    });
    console.log(`JWT token sent in cookie for user: ${user._id}`);

    res.status(200).json({ user: { id: user._id, name: user.name, email: user.email }, token });
  } catch (err) {
    const errors = handleError(err);
    console.log('Login failed with errors:', errors);
    res.status(400).json({ errors });
  }
};

export const logout_get = (req, res) => {
  console.log('Logout request received');
  res.cookie('jwt', '', { maxAge: 1 });
  console.log('JWT token cleared');
  res.status(204).send();
};

export const signup_get = (req, res) => {
  console.log('Signup page requested');
  res.send('Signup Page');
};

export const login_get = (req, res) => {
  console.log('Login page requested');
  res.send('Login Page');
};
