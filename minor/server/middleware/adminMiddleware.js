import authMiddleware from "./authMiddleware.js";

const adminMiddleware = (req, res, next) => {
  return authMiddleware(req, res, () => {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({
        message: "Admin access required",
      });
    }

    next();
  });
};

export default adminMiddleware;
