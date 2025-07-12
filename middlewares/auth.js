const Employee = require("../models/Employee");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/config.json")["development"];

const authMiddleware = async (req, res, next) => {
    //Existe llave de usuario
    /*const userKey = req.headers["llave"];
    if (!userKey) {
        res.status(401).send("Missing auth header");
        return;
    }*/
    //req.user = user.dataValues;
    const token = req.headers.authorization;
    if (!token) {
        res.status(401).send("There is no token");
        return;
    }

    const payload = jwt.verify(token, jwt_secret);
    // User id decodificado del token, la id tiene que ser del member controller.js donde está el let token
    const userId = payload.id;
    console.log(payload);
    console.log(userId);
    // Llave es el id del usuario
    //const user = await Member.findByPk(userKey);
    const user = await Employee.findByPk(userId);
    if (!user) {
        res.status(401).send("Invalid auth header");
        return;
    }
    // Agregar el usuario a la request que se esta haceindo
    req.user = user.dataValues;
    //req.token = token.dataValues;
    next();
};

exports.authMiddleware = authMiddleware;