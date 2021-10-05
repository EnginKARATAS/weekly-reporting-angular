const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, "dvurising");
    if (decodedToken.is_gm == true) {
      next();
    }
  } catch (error) {
    return res.json({
      message: "Doğrulanamayan kullanıcı. Lütfen giriş yapınız. ",
      resCode: 401,
    });
  }
};
