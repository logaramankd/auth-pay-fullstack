const express = require('express'); // Framework to build API
const cors = require('cors');       // Allow frontend to talk to backend
const bcrypt = require('bcrypt');   // For password hashing & verifying
const jwt = require('jsonwebtoken'); // For creating & verifying tokens
const db = require('./db');         // Knex instance (MySQL DB)

const app = express()

// middelware
app.use(cors())
app.use(express.json())

const SECRET_KEY = 'supersecretkey';

app.post('/register', async (req, res) => {
    const { userName, email, password } = req.body;

    const existingUser = await db('users').where({ email }).first()
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hashPassword = await bcrypt.hash(password, 10)

    await db('users').insert({
        userName,
        email,
        password: hashPassword
    })

    res.json({ message: 'Register Succesfully' })

})
app.post('/login', async (req, res) => {
    const { email, password } = req.body
    const user = await db('users').where({ email }).first()
    if (!user) {
        return res.status(401).json({ message: 'Invalid Credentials' })
    }
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign(
        { id: user.id, email: user.email, userName: user.userName },
        
        SECRET_KEY,
        { expiresIn: '1h' }
    )
    res.json({ token })
})
function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: 'wrong authorization' })
    const token = authHeader.split(' ')[1]
    if (!token) return res.status(401).json({ message: 'token missing' })
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.sendStatus(403)
        req.user = decoded; // attach user to request
        next();
    })
}
app.post('/payment', verifyToken, (req, res) => {
    // You can access req.user here
    res.json({ message: `Payment successful for user ID ${req.user.id} 🤑` });

})
const Port = 5000;
app.listen(Port, () => {
    console.log(`Server running on http://localhost:${Port}`);
})