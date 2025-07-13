import { useEffect, useRef, useState } from "react";
import "./Profile.css";

const Profile = () => {
  const [userData, setUserData] = useState({
    nombre: "",
    rol: "",
    fecha_alta: "",
    supervisor: "",
    email: "",
    proyectos: [],
  });

  const fileInputRef = useRef();
  const [imagenPerfil, setImagenPerfil] = useState(null);

  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [dibujando, setDibujando] = useState(false);
  const [firmaURL, setFirmaURL] = useState(null);

  const [getdisabled, setdisabled] = useState(false);

  const manejarClickImagen = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    const storedData = {
      nombre: JSON.parse( localStorage.getItem('login'))?.name,
      rol: JSON.parse( localStorage.getItem('login'))?.role,
      fecha_alta: "2024-07-10",
      supervisor: "Supervisor X",
      email: "supervisor@example.com",
    };
    setUserData(storedData);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 500;
    canvas.height = 200;
    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000";
    ctxRef.current = ctx;
  }, []);

  const obtenerPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX || e.touches[0].clientX;
    const y = e.clientY || e.touches[0].clientY;
    return [x - rect.left, y - rect.top];
  };

  const comenzarDibujo = (e) => {
    setDibujando(true);
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(...obtenerPos(e));
  };

  const dibujar = (e) => {
    if (!dibujando) return;
    ctxRef.current.lineTo(...obtenerPos(e));
    ctxRef.current.stroke();
  };

  const terminarDibujo = () => {
    setDibujando(false);
  };

  const limpiarFirma = () => {
    ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setFirmaURL(null);
    setdisabled(false);
  };

  const guardarFirma = () => {
    const dataUrl = canvasRef.current.toDataURL("image/png");
    setFirmaURL(dataUrl);
    setdisabled(true);
  };

  const descargarFirma = (formato = "png") => {
    const mime = formato === "jpg" ? "image/jpeg" : "image/png";
    const link = document.createElement("a");
    link.download = `firma.${formato}`;
    link.href = canvasRef.current.toDataURL(mime);
    link.click();
  };

  const subirFirmaAlServidor = async () => {
    const blob = await new Promise((res) => canvasRef.current.toBlob(res, "image/png"));
    const formData = new FormData();
    formData.append("firma", blob, "firma.png");

    try {
      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      alert("Firma subida con éxito: " + data.path);
    } catch (err) {
      console.error(err);
      alert("Error al subir firma.");
    }
  };

  const manejarCambioImagen = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      const lector = new FileReader();
      lector.onload = () => setImagenPerfil(lector.result);
      lector.readAsDataURL(archivo);
    }
  };

  return (
    <div className="profile-container">
      
      <div className="profile-image-section">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={manejarCambioImagen}
          style={{ display: "none" }}
        />
        <img
          src={imagenPerfil || "/src/assets/avatar.png"}
          alt="Image"
          onClick={manejarClickImagen}
          className="profile-image"
          title="Haz clic para cambiar la foto"
        />
      </div>
      <button>Save Image</button>

      <div className="profile-data">
        <label>
          Name:
          <input
            value={userData.nombre}
            onChange={(e) => setUserData({ ...userData, nombre: e.target.value })}
            className="input-nombre"
          />
        </label>
        <p><strong>Role:</strong> {userData.rol}</p>
        <p><strong>DateAccess Date: </strong> {userData.fecha_alta}</p>
        <p><strong>Supervisor:</strong> {userData.supervisor}</p>
        <p><strong>Supervisor Email:</strong> {userData.email}</p>
      </div>

      <h2>Firma digital</h2>
      <canvas
        ref={canvasRef}
        className="firma-canvas"
        onMouseDown={comenzarDibujo}
        onMouseMove={dibujar}
        onMouseUp={terminarDibujo}
        onMouseOut={terminarDibujo}
        onTouchStart={comenzarDibujo}
        onTouchMove={(e) => {
          e.preventDefault();
          dibujar(e);
        }}
        onTouchEnd={terminarDibujo}
      ></canvas>

      <div className="botones-firma">
        <button onClick={limpiarFirma}>Limpiar</button>
        <button onClick={guardarFirma} disabled={getdisabled}>Guardar firma</button>
      </div>

      {firmaURL && (
        <div className="firma-preview">
          <div id="">
            <button onClick={() => descargarFirma("png")}>Descargar PNG</button>
            <button onClick={subirFirmaAlServidor}>Subir al servidor</button>
          </div>
          <div id="">
            <img src={firmaURL} alt="Firma guardada" className="firma-img" />
          </div>
        </div>
      )}
      
    </div>
  );
};

export { Profile };