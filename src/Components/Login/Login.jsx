import { useState } from "react";
import { Button, Input, Flex, Typography } from "antd";
import { useNavigate } from "react-router";
import logo from "../../assets/Celima.PNG";
import "./Login.scss";

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const isButtonEnabled = email.trim() !== "" && password.trim() !== "";

  const handleLoginButtonClick = () => {
    setErrorMsg(""); // limpiar error previo

    fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          // cualquier error, mostrar mensaje del backend
          setErrorMsg(data.msg || "Error desconocido");
        } else {
          // éxito: guardar token y usuario
          localStorage.setItem("access_token", data.accessToken);
          localStorage.setItem("user", data.name);

          navigate("/dashboard");
        }
      })
      .catch((err) => {
        console.error(err);
        setErrorMsg("Error en la conexión al servidor");
      });
  };

  return (
    <Flex>
      <div className="login-container">
        <div className="login-card">
          <Title level={2}>Login</Title>
          <Input
            value={email}
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo Electrónico"
            className="login-input"
          />
          <Input
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="login-input"
          />
          <Button
            disabled={!isButtonEnabled}
            type="primary"
            onClick={handleLoginButtonClick}
          >
            Login
          </Button>
          <br />
          <Typography.Text className="error">{errorMsg}</Typography.Text>
        </div>
      </div>
      <img src={logo} alt="Logo Celima" className="login-logo" />
    </Flex>
  );
};

export { Login };
