// controllers/adminController.js
// Controller logic for admin login
const jwt = require('jsonwebtoken');

const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'password123';
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

exports.login = (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '8h' });
    return res.json({ token });
  }
  res.status(401).json({ error: 'Invalid credentials' });
}; 