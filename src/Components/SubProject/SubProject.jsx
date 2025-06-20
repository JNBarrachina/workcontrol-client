import { useState, useEffect } from "react";
import { Button, Input, Flex, Typography } from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
//import {Title} from "../../Title/Title"

//import "./Login.scss";

const { Title } = Typography;
const SubProject = () => {
    const navigate = useNavigate();
    const [subproject, setSubProject] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const isButtonEnabled = subproject;

    const handleLoginButtonClick = () => {
        fetch("http://localhost:3000/users/subproject", {
            headers: {
                "Content-type": "application/json"
            },
            method: "POST", body: JSON.stringify(
                { name: subproject })
        })
            .then(async (res) => {
                const data = await res.json();
                if (res.status >= 400 && data.msg) {
                    setErrorMsg(data.msg);
                } else {
                    console.log(data);
                    localStorage.setItem("subproject", data.name)
                    navigate("/")
                    //window.location.href = "/";
                }
            })
            .catch((err) => console.error(err))
    }
    return (
        <Flex>
            <div>
                <div>
                    <Title level={2}>SubProyectos</Title>
                    <Input
                        value={user}
                        type="text"
                        onChange={(event) =>
                            setSubProject(event.target.value)}
                        placeholder="Crear subproyecto"
                    />
                    <Button disabled={!isButtonEnabled} type="primary" onClick={handleLoginButtonClick}>Login</Button><br />
                    <Typography.Text className="error">{errorMsg}</Typography.Text>
                </div>

            </div>
            <img src={logo} alt="Logo Celima" className="login-logo" />
        </Flex>
    )
};

export { SubProject }