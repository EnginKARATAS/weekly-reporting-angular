const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, "dvurising");
    console.log("🚀 🚀🚀🚀~ file: checkGmAuth.js ~ line 8 ~ req.body.gm_id", req.body)
    console.log("🚀 🚀🚀🚀~ file: checkGmAuth.js ~ line 8 ~ decodedToken.gm_id", decodedToken)
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
