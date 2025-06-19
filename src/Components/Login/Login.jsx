import { useState, useEffect } from "react";
import { Button, Input, Flex, Typography } from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
//import {Title} from "../../Title/Title"
//import "./Login.scss";

const { Title } = Typography;
const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const isButtonEnabled = user && password


    /*useEffect(() => {
            const datosguardados = localStorage.getItem("login");
            if (datosguardados) {
                setUser(JSON.parse(datosguardados));
            }
        }, []);*/

    const handleLoginButtonClick = () => {
        console.log(user, password);
        const savedData = JSON.parse(localStorage.getItem("login"));

        if (savedData && user === savedData.user && password === savedData.password) {
            navigate("/");
        } else {
            setErrorMsg("Usuario o contraseña incorrectos");
        }
        // POST /register
        // si el resultado es exitoso redirigir a /login
    }
    return (
        <Flex>
            <div>
                <Title>Login</Title>
                <Input
                    value={user}
                    type="text"
                    onChange={(event) =>
                        setUser(event.target.value)}
                    placeholder="Nombre"
                />

                <Input
                    value={password}
                    type="password"
                    onChange={(event) =>
                        setPassword(event.target.value)}
                    placeholder="Contraseña"
                />
                <Button disabled={!isButtonEnabled} type="primary" onClick={handleLoginButtonClick}>Login</Button>
                <Typography.Text>{errorMsg}</Typography.Text>
                <p>
                    No tienes cuenta? <Link to="/register">Registrate ahora</Link>
                </p>
            </div>
        </Flex>
    )
};

export { Login }