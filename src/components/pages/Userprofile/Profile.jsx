import { useEffect, useRef, useState, createContext } from "react";
import { UserprofileCanvas } from './UserprofileCanvas.jsx'
import "./Profile.css";


const CanvasContext = createContext();

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
  const [getverifysignature, setverifysignature] = useState("/src/assets/crosscirclelinear_106172.svg");
  const [gethavesignature, sethavesignature] = useState(true)

  const manejarClickImagen = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    const storedData = {
      nombre: JSON.parse( localStorage.getItem('login'))?.name,
      rol: JSON.parse( localStorage.getItem('login'))?.role,
      email: JSON.parse( localStorage.getItem('login'))?.email,
      dni: JSON.parse( localStorage.getItem('login'))?.dni,
      tlf: JSON.parse( localStorage.getItem('login'))?.tlf,
      fecha_alta: "2024-07-10",
      supervisor: "Supervisor X",
      email_sup: "supervisor@example.com",
    };
    setUserData(storedData);
  }, []);

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
        <p><strong>Email:</strong>{userData.email}</p>
        <p><strong>DNI:</strong>{userData.dni}</p>
        <p><strong>Telephone:{userData.tlf}</strong></p>
        <section style={{display:'flex',flexDirection:'row', gap:'1rem'}}>
          <p><strong>Upload Signature: </strong></p>
          <img src={ getverifysignature } alt="" />
        </section>

        <p><strong>Access Date: </strong> {userData.fecha_alta}</p>

        <p><strong>Supervisor:</strong> {userData.supervisor}</p>
        <p><strong>Supervisor Email:</strong> {userData.email_sup}</p>
      </div>

      <h2>Digital Signature</h2>
      {gethavesignature && <>
        <CanvasContext.Provider value={{getverifysignature, setverifysignature, userData}}>
          < UserprofileCanvas />
        </CanvasContext.Provider>
      </>}


    </div>
  );
};

export { Profile, CanvasContext, };