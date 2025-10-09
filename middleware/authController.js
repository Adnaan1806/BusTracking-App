import jwt from "jsonwebtoken";

export const authUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization token missing or invalid" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const hashed = jwt.verify(token, process.env.JWT_SECRET);
    req.user = hashed; // now req.user.role and req.user.id are available
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
