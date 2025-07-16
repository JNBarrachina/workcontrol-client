import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Input, Flex, Typography } from "antd";
import { useNavigate } from "react-router";

import { UserDataContext } from "../../../contexts/UserDataContext";
import { UserProjectsContext } from "../../../contexts/UserProjectsContext";
import { ProjectsManagerContext } from "../../../contexts/ProjectsManagerContext";

import "./Login.scss";

const { Title } = Typography;
const Login = () => {
    const navigate = useNavigate();
    const { userData, setUserData, getlogeaded, setlogeaded, } = useContext(UserDataContext);
    const { userProjects, setUserProjects } = useContext(UserProjectsContext);
    const { projectsManager, setProjectsManager } = useContext(ProjectsManagerContext);

    const [gettypeimput, septypeimput] = useState("password");
    const [gettypeimage, settypeimage] = useState("/src/assets/eye_visible.svg");

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const isButtonEnabled = email && password

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
                console.log(userProjects);
                setUserProjects(userProjects);
                localStorage.setItem("userprojects", JSON.stringify(userProjects));
            })
            .catch((err) => console.error(err))

        if (userData.role === "admin") {
            fetch(`http://localhost:3000/projects/`, {
                headers: {
                    "Content-type": "application/json"
                },
                method: "GET",
            })
                .then(async (res) => {
                    const projectsManager = await res.json();
                    console.log("Todos los proyectos de la app: ", projectsManager);

                    setProjectsManager(projectsManager);
                    localStorage.setItem("projectsmanager", JSON.stringify(projectsManager));
                })
                .catch((err) => console.error(err))
        }
    }

    return (
        <Flex>
            <main id="login-main">
                <div className="login-container">
                    <div className="login-card">
                        <img src="/src/assets/workflow.png" alt="" />
                        <Title level={3}>Login</Title>

                        <section style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }} />
                        <section className="login-input-container">
                            <Input
                                value={email}
                                type="text"
                                onChange={(event) =>
                                    setEmail(event.target.value)}
                                placeholder="Correo Electronico"
                                className="login-input"
                            />
                        </section>


                        <section style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }} />


                        <section className="login-input-container">
                            <Input
                                value={password}
                                type={gettypeimput}
                                onChange={(event) => setPassword(event.target.value)}
                                placeholder="Contraseña"
                                className="login-input"
                            />


                            <button style={{ padding: '0', height: '2.80rem' }}>

                                <img
                                    style={{ height: '2rem' }}
                                    src={gettypeimage}
                                    alt="view"
                                    onClick={() => {
                                        if (gettypeimput === "password") {
                                            settypeimage("/src/assets/eye_visible_hidden.svg");
                                            septypeimput("text");
                                        } else {
                                            settypeimage("/src/assets/eye_visible.svg");
                                            septypeimput("password");
                                        }
                                    }}
                                />
                            </button>

                        </section>
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