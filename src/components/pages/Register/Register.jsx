import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Input, Flex, Typography } from "antd";
import { useNavigate } from "react-router";

import { UserDataContext } from "../../../contexts/UserDataContext";
import { UserProjectsContext } from "../../../contexts/UserProjectsContext";

import "./Register.scss";

const { Title } = Typography;
const Register = () => {
    const navigate = useNavigate();

    const [gettypeimput, septypeimput] = useState("password");
    const [gettypeimage, settypeimage] = useState("/src/assets/eye_visible.svg");

    const [surname, setSurname] = useState("");
    const [dni, setDNI] = useState("");
    const [tlf, setTlf] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("user");
    const [name, setName] = useState("");
    const { userData, setUserData, getlogeaded, setlogeaded, } = useContext(UserDataContext);
    const { userProjects, setUserProjects } = useContext(UserProjectsContext);
    const [errorMsg, setErrorMsg] = useState("");
    const isButtonEnabled = email && password

    const handleLoginButtonClick = () => {
        fetch("http://localhost:3000/users/register", {
            headers: {
                "Content-type": "application/json"
            },
            method: "POST", body: JSON.stringify(
                { name: name, surname: surname, dni: dni, tlf: tlf, email: email, password: password, role: role })
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
    }

    return (
        <Flex>
            <main id="login-main">
                <div className="login-container">
                    <div className="login-card">
                        <img src="/src/assets/workflow.png" alt="" />
                        <Title level={3}>Register</Title>
                        <section style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <Input
                                style={{ width: '90%' }}
                                value={name}
                                type="text"
                                onChange={(event) =>
                                    setName(event.target.value)}
                                placeholder="Nombre"
                                className="login-input"
                            />
                        </section>

                        <section style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <Input
                                style={{ width: '90%' }}
                                value={surname}
                                type="text"
                                onChange={(event) =>
                                    setSurname(event.target.value)}
                                placeholder="Apellidos"
                                className="login-input"
                            />
                        </section>


                        <section style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <Input
                                style={{ width: '90%' }}
                                value={email}
                                type="text"
                                onChange={(event) =>
                                    setEmail(event.target.value)}
                                placeholder="Correo Electronico"
                                className="login-input"
                            />
                        </section>

                        <section style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <Input
                                style={{ width: '90%' }}
                                value={dni}
                                type="text"
                                onChange={(event) =>
                                    setDNI(event.target.value)}
                                placeholder="DNI"
                                className="login-input"
                            />
                        </section>

                        <section style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <Input
                                style={{ width: '90%' }}
                                value={tlf}
                                type="text"
                                onChange={(event) =>
                                    setTlf(event.target.value)}
                                placeholder="Telefono"
                                className="login-input"
                            />
                        </section>

                        <section style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <Input
                                style={{ width: '90%' }}
                                value={role}
                                type="text"
                                onChange={(event) =>
                                    setRole(event.target.value)}
                                placeholder="Rol(admin o user)"
                                className="login-input"
                            />
                        </section>

                        <section style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                            <Input
                                style={{ width: '90%' }}
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
                        <Button disabled={!isButtonEnabled} className="loginBtn" onClick={handleLoginButtonClick}>Register</Button><br />
                        <Typography.Text className="error">{errorMsg}</Typography.Text>
                        <img src="/src/assets/lasnavesajuntament.webp" alt="" className="lasnaves" />
                        <p>
                            Ya tienes cuenta? <Link to="/login">Logueate ahora</Link>
                        </p>
                    </div>
                </div>
            </main>
        </Flex>
    )
}

export { Register }