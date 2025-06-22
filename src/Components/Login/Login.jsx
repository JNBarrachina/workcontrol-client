import { useState, useEffect } from "react";
import { Button, Input, Flex, Typography } from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
//import {Title} from "../../Title/Title"
import logo from "../../assets/Celima.PNG";

import "./Login.scss";

const { Title } = Typography;
const Login = () => {
    const navigate = useNavigate();
    //const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const isButtonEnabled = email && password


    /*useEffect(() => {
            const datosguardados = localStorage.getItem("login");
            if (datosguardados) {
                setUser(JSON.parse(datosguardados));
            }
        }, []);*/

    const handleLoginButtonClick = () => {
        fetch("http://localhost:3000/users/login", {
            headers: {
                "Content-type": "application/json"
            },
            method: "POST", body: JSON.stringify(
                { email: email, password: password })
        })
            .then(async (res) => {
                const data = await res.json();
                if (res.status >= 400 && data.msg) {
                    setErrorMsg(data.msg);
                } else {
                    console.log(data);

                    localStorage.setItem("access_token", data.accessToken)

                    localStorage.setItem("user", data.name)

                    navigate("/dashboard")
                    //window.location.href = "/";
                }
            })
            .catch((err) => console.error(err))
        //Luego, lo parseamos con el getItem del valor que hemos añadido en el setItem y el logín leerá
        //los usuarios para que tengan el login correcto en su base de datos.
        const savedData = JSON.parse(localStorage.getItem("login"));
        console.log(savedData);

        if (savedData &&

            email === savedData.email &&
            password === savedData.password ) 
            {
                navigate("/dashboard");
            } else {
            setErrorMsg("Usuario, contraseña o correo incorrectos");
            }
        // POST /register
        // si el resultado es exitoso redirigir a /login
    }
    return (
        <Flex>
            <div className="login-container">
                <div className="login-card">
                    <Title level={2}>Login</Title>
                    <Input
                        value={email}
                        type="text"
                        onChange={(event) =>
                            setEmail(event.target.value)}
                        placeholder="Correo Electronico"
                        className="login-input"
                    />

                    <Input
                        value={password}
                        type="password"
                        onChange={(event) =>
                            setPassword(event.target.value)}
                        placeholder="Contraseña"
                        className="login-input"
                    />
                    <Button disabled={!isButtonEnabled} type="primary" onClick={handleLoginButtonClick}>Login</Button><br />
                    <Typography.Text className="error">{errorMsg}</Typography.Text>
                </div>

            </div>
            <img src={logo} alt="Logo Celima" className="login-logo" />
        </Flex>
    )
};

export { Login }