import jwt from "jsonwebtoken";
import skillCollection  from "../Model/model.js"; // your USER model

const protect = async (req, res, next) => {
  let token;

  // Get token from header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JSON_WEB);

      // Get logged-in user
      req.user = await skillCollection
        .findById(decoded.id)
        .select("-password");

      next();
    } catch (err) {
      return res.status(401).json({ mess: "Token invalid" });
    }
  }

  if (!token) {
    return res.status(401).json({ mess: "No token found" });
  }
};

export default protect;
