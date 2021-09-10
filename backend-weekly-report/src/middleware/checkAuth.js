const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        /*JWT is send with request header! 
        Format of it: Authorization : Bearer <token>
        */
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token, 'secret_key');
        req.userData = decodedToken;
        next();
    }catch(error) {
        return res.status(401).send({
            message: 'Doğrulanamayan kullanıcı. Lütfen giriş yapınız. ',
            resCode: 401
        });
    }
}