import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(403).send("Access Denied");
    }

    if (token.startsWith("Bearer ")) {
      const tokenValue = token.substring(7).trim(); // Odstranit "Bearer " ze začátku
      const verified = jwt.verify(tokenValue, process.env.JWT_SECRET);
      req.user = verified;
      next();
    } else {
      return res.status(403).send("Invalid token format");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};
