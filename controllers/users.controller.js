const Employee = require("../models/Employee");

const bcryptjs = require("bcryptjs");

const jwt = require("jsonwebtoken");

const { jwt_secret } = require("../config/config.json")["development"];

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try{
    const user = await Employee.findOne({ where: { email: email } });

    //const hashedPassword = bcryptjs.hashSync(password);
    //res.send(hashedPassword);
    //return;
    if (!user) {
        res.status(404).send({ msg: "INCORRECT_USERNAME" });
        return;
    }
    // const isPasswordMatch = bcryptjs.compareSync(password, user.password);
    if (password !== user.password) {
        res.status(400).send({ msg: "INCORRECT_USER_OR_PASSWORD" });
        return;
    }

    const userInfo = {
        id: user.id,
        name: user.name,
        surname: user.surname,
        dni: user.dni,
        email: user.email,
        tlf: user.tlf,
        avatar: user.avatar,
        role: user.role
    };

    res.status(200).send(userInfo);

    //USUARIO Y PASSWORD VALIDO
    // Generar un token con el userId y el role en el payload .sign()
    // y un jwt secret
    // let token = jwt.sign({ id: user.id, role: user.role }, jwt_secret);
    // res.status(201).send({ accessToken: token, user: user });
    }catch (err){
        console.error("Login error:", err);
        return res.status(500).send({ msg: "SERVER_ERROR" });
    }
};

module.exports = { loginUser };