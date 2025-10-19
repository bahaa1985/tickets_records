
import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import { getUsers } from '../mongo/api/user.js';
import { getUser } from '../mongo/api/login.js';

const login_router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

login_router.use(cookieParser());


// Middleware to verify JWT
function verifyToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send({ message: 'No token provided' });
    }
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Failed to authenticate token' });
        }
        req.user = decoded;
        next();
    });
}

// GET: Only allow if JWT is valid
login_router.get('/', verifyToken, async (req, res) => {
    try {
        // Optionally, you can use req.user info to fetch user-specific data
        const user = req.user
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ 'Get User:': error.message });
    }
});


// POST: Login, sign JWT, set cookie, return user info
login_router.post('/', express.urlencoded({ extended: false }), async (req, res) => {
    const user = req.body;
    
    try {
        const authUser = await getUser(user.userName, user.password);
        if (!authUser) {
            return res.status(401).send({ message: 'Invalid username or password' });
        }
        // Sign JWT with user info (do not include password)
        const token = jwt.sign({
            _id: authUser._id,
            userName: authUser.userName,
            role: authUser.role || null
        }, JWT_SECRET, { expiresIn: '1d' });
        // Set token in cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });
        // Return user info (without password)
        const { password, ...userInfo } = authUser;
        res.status(200).send({ user: userInfo });
    } catch (error) {
        res.status(500).send({ 'Get User:': error.message });
    }
});

export default login_router;
