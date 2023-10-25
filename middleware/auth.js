import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  const secretKey = process.env.JWT_SECRET;
  if (!token)
    return res.status(401).send({ error: "Access denied. No token provided." });

  try {
    const payload = Jwt.verify(token, secretKey);
    req.user = payload;
    next();
  } catch (err) {
    res.status(400).send({ error: "Invalid token." });
  }
};
export default { auth };
