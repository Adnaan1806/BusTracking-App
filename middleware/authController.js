import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  const requestToken = req.headers.authorization;

  if (!requestToken || !requestToken.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization token is invalid" });
  }

  const token = requestToken.split(" ")[1];

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

const validateUser = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};

export { authUser, validateUser };
