import { useState, useEffect } from "react";
import { Button, Input, Flex, Typography } from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
//import {Title} from "../../Title/Title"

//import "./Login.scss";

const { Title } = Typography;
const EmployeeWorkEntry = () => {
    const navigate = useNavigate();
    const [subproject, setSubProject] = useState("");
    const [user, setUser] = useState("");
    const [date, setDate] = useState("");
    const [hours, setHours] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const isButtonEnabled = date && hours && subproject && user ;

    const handleEmployeeWorkEntryButtonClick = () => {
        fetch("http://localhost:3000/users/workentry", {
            headers: {
                "Content-type": "application/json"
            },
            method: "POST", body: JSON.stringify({ 
                date: date,
                hours: hours,
                subprojectId: subproject,
                employeeId: user
            })
        })
            .then(async (res) => {
                const data = await res.json();
                if (res.status >= 400 && data.msg) {
                    setErrorMsg(data.msg);
                } else {
                    console.log(data);
                    localStorage.setItem("employeeworkentry", data.user)
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
                        value={subproject}
                        type="number"
                        onChange={(event) =>
                            setSubProject(event.target.value)}
                        placeholder="Crear subproyecto"
                    />
                    <Input
                        value={user}
                        type="number"
                        onChange={(event) =>
                            setUser(event.target.value)}
                        placeholder="Id del empleado"
                    />
                    <Input
                        value={date}
                        type="date"
                        onChange={(event) =>
                            setDate(event.target.value)}
                        placeholder="Fecha"
                    />
                    <Input
                        value={hours}
                        type="number"
                        onChange={(event) =>
                            setHours(event.target.value)}
                        placeholder="Horas que hiciste en el subproyecto"
                    />
                    <Button disabled={!isButtonEnabled} type="primary" onClick={handleEmployeeWorkEntryButtonClick}>Crear</Button><br />
                    <Typography.Text className="error">{errorMsg}</Typography.Text>
                </div>
            </div>
        </Flex>
    )
};

export { EmployeeWorkEntry }