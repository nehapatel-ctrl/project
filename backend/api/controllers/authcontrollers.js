const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pool = require('../db/db');

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
};

const registerUser = async (req,res) =>{
    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query('INSERT INTO auth (username, password) VALUES ($1, $2)', [username, hashedPassword]);
        res.json({ message: 'User registered successfully' });
        console.log('User registered:', username);
    } catch (error) {
        if (error.code === '23505') { // Unique constraint violation
            return res.json({ message: 'Username already exists' });
        }
        res.json({ message: 'Internal Server Error' });
    }

}

const loginUser = async (req,res) => {
    const { username, password } = req.body;

    try {
        const user = await pool.query('SELECT * FROM auth WHERE username = $1', [username]);

        if (!user.rows.length) {
            return res.json({ message: 'User not found' });
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) {
            return res.json({ message: 'Invalid password' });
        }

        const token = generateToken({ id: user.rows[0].id, username: user.rows[0].username });
        res.json({ token });
    } catch (error) {
        res.json({ message: 'Internal Server Error' });
    }
}

module.exports= {registerUser, loginUser};