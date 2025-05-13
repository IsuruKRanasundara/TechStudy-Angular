//Middleware to check if the user has the required role




const userRoleMiddleware = (requiredRole) => {
    return (req, res, next) => {
        const user = req.user; // Assuming user info is attached to req in a previous middleware

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (user.role !== requiredRole) {
            return res.status(403).json({ message: "Forbidden: Insufficient permissions" });
        }

        next();
    };
}