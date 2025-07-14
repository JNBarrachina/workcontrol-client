import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Flex, Typography } from "antd";

import { UserDataContext } from "../../../contexts/UserDataContext";
import { UserProjectsContext } from "../../../contexts/UserProjectsContext";
import { ProjectsManagerContext } from "../../../contexts/ProjectsManagerContext";

import "./Login.scss";

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();

  const { setUserData, setlogeaded } = useContext(UserDataContext);
  const { setUserProjects } = useContext(UserProjectsContext);
  const { setProjectsManager } = useContext(ProjectsManagerContext);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [gettypeimput, septypeimput] = useState("password");
  const [gettypeimage, settypeimage] = useState("/src/assets/eye_visible.svg");

  const isButtonEnabled = email && password;

  const handleLoginButtonClick = async () => {
    try {
      const res = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.status >= 400) {
        setErrorMsg(data.msg || "Error al iniciar sesión");
        return;
      }

      // Guardar info de usuario
      setUserData(data);
      setlogeaded(true);
      localStorage.setItem("login", JSON.stringify(data));

      // Obtener proyectos del usuario
      const projectsRes = await fetch(`http://localhost:3000/users/userprojects/${data.id}`);
      const projectsData = await projectsRes.json();
      setUserProjects(projectsData);
      localStorage.setItem("userprojects", JSON.stringify(projectsData));

      // Si es admin, cargar todos los proyectos
      if (data.role === "admin") {
        const allProjectsRes = await fetch("http://localhost:3000/projects/");
        const allProjectsData = await allProjectsRes.json();
        setProjectsManager(allProjectsData);
        localStorage.setItem("projectsmanager", JSON.stringify(allProjectsData));
      }

      navigate("/dashboard");
    } catch (err) {
      console.error("Error en login:", err);
      setErrorMsg("Error del servidor");
    }
  };

  return (
    <Flex>
      <main id="login-main">
        <div className="login-container">
          <div className="login-card">
            <img src="/src/assets/workflow.png" alt="" />
            <Title level={3}>Login</Title>

            {/* Email */}
            <section className="login-input-container">
              <Input
                value={email}
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Correo electrónico"
                className="login-input"
              />
            </section>

            {/* Contraseña */}
            <section className="login-input-container" style={{ display: "flex", alignItems: "center" }}>
              <Input
                value={password}
                type={gettypeimput}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                className="login-input"
                style={{ width: "90%" }}
              />
              <button
                onClick={() => {
                  if (gettypeimput === "password") {
                    septypeimput("text");
                    settypeimage("/src/assets/eye_visible_hidden.svg");
                  } else {
                    septypeimput("password");
                    settypeimage("/src/assets/eye_visible.svg");
                  }
                }}
                style={{ background: "none", border: "none", padding: 0 }}
              >
                <img src={gettypeimage} alt="view" style={{ height: "2rem" }} />
              </button>
            </section>

            {/* Botón */}
            <Button
              disabled={!isButtonEnabled}
              className="loginBtn"
              onClick={handleLoginButtonClick}
            >
              Login
            </Button>

            {/* Error */}
            <Typography.Text className="error">{errorMsg}</Typography.Text>

            <img src="/src/assets/lasnavesajuntament.webp" alt="" className="lasnaves" />
            <p>
              ¿No tienes cuenta? <Link to="/register">Regístrate ahora</Link>
            </p>
          </div>
        </div>
      </main>
    </Flex>
  );
};

export { Login };
