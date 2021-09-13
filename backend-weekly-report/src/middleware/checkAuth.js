        const jwt = require("jsonwebtoken");

        module.exports = (req, res, next) => {
        try {
            /*JWT is send with request header! 
                Format of it: Authorization : Bearer <token>
                */
            const token = req.headers.authorization;
            const decodedToken = jwt.verify(token, "dvurising");
            req.userData = decodedToken;
            console.log(
            "🚀 ~ file: checkAuth.js ~ line 11 ~ req.userData",
            req.userData
            );
            next();
        } catch (error) {
            return res.json({
            message: "Doğrulanamayan kullanıcı. Lütfen giriş yapınız. ",
            resCode: 401,
            });
        }
        };
