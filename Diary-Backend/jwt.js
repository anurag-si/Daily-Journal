import jwt from "jsonwebtoken";
const { sign, verify } = jwt;

export const createTokens = (user) => {
  const accessToken = sign({ username: user.username, id: user.id }, "jwtcode");
  return accessToken;
};

export const validateToken = (req, res, next) => {
  const accessToken = req.cookies["access-token"];
  if (!accessToken)
    return res.status(400).json({ error: "User not authenticated!" });

  try {
    const validToken = verify(accessToken, "jwtcode");
    console.log(validToken)
    if (validToken) {
      req.authenticated = true;
      return next();
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};
