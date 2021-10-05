const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // console.log("⛳")
    // const token = req.headers.authorization;
    // const decodedToken = jwt.verify(token, "dvurising");
    // req.userData = decodedToken;
    next();
  } catch (error) {
    return res.json({
      message: "Doğrulanamayan E-Posta. Lütfen giriş yapınız. ",
      resCode: 401,
    });
  }
};
