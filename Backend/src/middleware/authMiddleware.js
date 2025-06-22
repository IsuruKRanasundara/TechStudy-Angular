// middlewares/userMiddleware.js

const jwt = require("jsonwebtoken");

const userMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET || 'secretKey',(err,user)=> {
            if(err) return res.sendStatus(403);
        });
        req.user = user; // attach user info to request
        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid token." });
    }
};

module.exports = userMiddleware;
