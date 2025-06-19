import { useState, useEffect } from "react";
import { Button, Input, Flex, Typography } from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
//import {Title} from "../../Title/Title"
import "./Login.scss";

const { Title } = Typography;
const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const isButtonEnabled = user && password && email


    /*useEffect(() => {
            const datosguardados = localStorage.getItem("login");
            if (datosguardados) {
                setUser(JSON.parse(datosguardados));
            }
        }, []);*/

    const handleLoginButtonClick = () => {
        console.log(user, password, email);
        const savedData = JSON.parse(localStorage.getItem("login"));
        console.log(savedData);

        if (savedData && user === savedData.user && password === savedData.password && email === savedData.email) {
            navigate("/");
        } else {
            setErrorMsg("Usuario o contraseña incorrectos");
        }
        // POST /register
        // si el resultado es exitoso redirigir a /login
    }
    return (
        <Flex>
            <div className="login-card">
                <Title>Login</Title>
                <Input
                    value={user}
                    type="text"
                    onChange={(event) =>
                        setUser(event.target.value)}
                    placeholder="Nombre"
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
                <Input
                    value={email}
                    type="text"
                    onChange={(event) =>
                        setEmail(event.target.value)}
                    placeholder="Correo"
                    className="login-input"
                />
                <Button disabled={!isButtonEnabled} type="primary" onClick={handleLoginButtonClick}>Login</Button>
                <Typography.Text>{errorMsg}</Typography.Text>
            </div>
        </Flex>
    )
};

export { Login }