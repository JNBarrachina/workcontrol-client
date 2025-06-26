import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Input, Flex, Typography } from "antd";
import { useNavigate } from "react-router";

import { UserDataContext } from "../../../contexts/UserDataContext";
import { UserProjectsContext } from "../../../contexts/UserProjectsContext";

import "./Login.scss";

const { Title } = Typography;
const Login = () => {
    const navigate = useNavigate();
    //const [user, setUser] = useState("");
    //const { userData, setUserData } = useContext(UserDataContext);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const { userData, setUserData, getlogeaded, setlogeaded, } = useContext(UserDataContext);
    const { userProjects, setUserProjects } = useContext(UserProjectsContext);
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
                    setUserData(data);
                    setlogeaded(true);
                    localStorage.setItem("login", JSON.stringify(data));
                    navigate("/dashboard")
                }
            })
            .catch((err) => console.error(err))

        fetch(`http://localhost:3000/users/userprojects/${userData.id}`, {
            headers: {
                "Content-type": "application/json"
            },
            method: "GET",
        })
            .then(async (res) => {
                const userProjects = await res.json();
                setUserProjects(userProjects);
                localStorage.setItem("userprojects", JSON.stringify(userProjects));
            })
            .catch((err) => console.error(err))
        //Luego, lo parseamos con el getItem del valor que hemos añadido en el setItem y el logín leerá
        //los usuarios para que tengan el login correcto en su base de datos.
        // const savedData = JSON.parse(localStorage.getItem("login"));
        // console.log(savedData);
        /*if (savedData && email === savedData.email && password === savedData.password) {
            navigate("/dashboard");
        } else {
            setErrorMsg("Usuario, contraseña o correo incorrectos");
        }*/
        // POST /register
        // si
    }

    return (
        <Flex>
            <main id="login-main">
                <div className="login-container">
                    <div className="login-card">
                        <img src="/src/assets/workflow.png" alt="" />
                        <Title level={3}>Login</Title>
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
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="Contraseña"
                            className="login-input"
                        />
                        <Button disabled={!isButtonEnabled} className="loginBtn" onClick={handleLoginButtonClick}>Login</Button><br />
                        <Typography.Text className="error">{errorMsg}</Typography.Text>
                        <img src="/src/assets/lasnavesajuntament.webp" alt="" className="lasnaves" />
                    </div>
                </div>
            </main>
        </Flex>
    )
}

export { Login }






