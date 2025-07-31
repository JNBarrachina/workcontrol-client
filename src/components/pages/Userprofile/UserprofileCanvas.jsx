import { useEffect, useRef, useState, useContext } from "react";
import { Profile, CanvasContext } from './Profile.jsx';
import './UserprofileCanvas.css';

const UserprofileCanvas = () => {
    const context = useContext(CanvasContext);

    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const [dibujando, setDibujando] = useState(false);
    const [firmaURL, setFirmaURL] = useState(null);
    const [getdisabled, setdisabled] = useState(false);
    const [getsignature, setsignature] = useState(null);
    const [showCanvas, setShowCanvas] = useState(false);

    // Funciones de dibujo
    const obtenerPos = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX || e.touches[0].clientX;
        const y = e.clientY || e.touches[0].clientY;
        return [x - rect.left, y - rect.top];
    };

    const comenzarDibujo = (e) => {
        if (!ctxRef.current) return;
        setDibujando(true);
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(...obtenerPos(e));
    };

    const dibujar = (e) => {
        if (!dibujando || !ctxRef.current) return;
        ctxRef.current.lineTo(...obtenerPos(e));
        ctxRef.current.stroke();
    };

    const terminarDibujo = () => {
        setDibujando(false);
    };

    const limpiarFirma = () => {
        if (ctxRef.current) {
            ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
        setFirmaURL(null);
        setdisabled(false);
    };

    const inicializarCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.width = 500;
        canvas.height = 200;
        const ctx = canvas.getContext("2d");
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#000";
        ctxRef.current = ctx;
    };

    const guardarFirma = () => {
        if (!canvasRef.current) return;
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

    function obtenerFechaActual() {
        const hoy = new Date();
        const dia = String(hoy.getDate()).padStart(2, '0');
        const mes = String(hoy.getMonth() + 1).padStart(2, '0');
        const anio = hoy.getFullYear();
        return `${dia}/${mes}/${anio}`;
    }

    const subirFirmaAlServidor = async () => {
        context.setverifysignature('/src/assets/updatesync_icon_176208.svg');
        const blob = await new Promise((res) => canvasRef.current.toBlob(res, "image/png"));

        const formData = new FormData();
        formData.append("firma", blob, "firma.png");
        formData.append("user", context.userData.nombre);
        formData.append("role", context.userData.rol);
        formData.append("email", context.userData.email);
        formData.append("dni", context.userData.dni);
        formData.append("create", obtenerFechaActual());

        try {
            const response = await fetch("http://localhost:3000/uploads", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            console.log(data);

            setTimeout(() => {
                context.setverifysignature('/src/assets/tickcirclelinear_106244.svg');
                cargarFirmados(); // Recargar la firma después de subirla
            }, 1000);
        } catch (err) {
            console.error(err);
            context.setverifysignature('/src/assets/crosscirclelinear_106172.svg');
        }
    };

    const cargarFirmados = async () => {
        try {
            const { email, nombre } = context.userData;
            if (!email || !nombre) {
                throw new Error('Datos de usuario incompletos');
            }

            const response = await fetch(
                `http://localhost:3000/uploads/firma/${email}/${nombre}`
            );

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const blob = await response.blob();
            if (blob.type === 'text/html') {
                throw new Error('No se encontró la firma');
            }

            const imageUrl = URL.createObjectURL(blob);
            setsignature(imageUrl);
            context.setverifysignature('/src/assets/tickcirclelinear_106244.svg');
            setShowCanvas(false);

        } catch (err) {
            console.error("Error al obtener la firma:", err);
            context.setverifysignature('/src/assets/crosscirclelinear_106172.svg');
            setsignature(null);
            setShowCanvas(true);
        }
    };

    const toggleCanvas = () => {
        setShowCanvas(!showCanvas);
        if (!showCanvas) {
            setTimeout(() => {
                inicializarCanvas();
                limpiarFirma();
            }, 0);
        }
    };

    // Efectos
    useEffect(() => {
        inicializarCanvas();
    }, []);

    useEffect(() => {
        if (context.userData?.email && context.userData?.nombre) {
            cargarFirmados();
        }
    }, [context.userData]);

    return (
        <>
            {getsignature && !showCanvas ? (
                <>
                    <button className="btnSignature" onClick={toggleCanvas}>Change Signature</button>
                    <img src={getsignature} alt="signature" />
                </>
            ) : (
                <>
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
                    />

                    <div className="botones-firma">
                        <button className="btnSignature" onClick={limpiarFirma}>Clean</button>
                        <button className="btnSignature" onClick={guardarFirma} disabled={getdisabled}>
                            Save Signature
                        </button>
                    </div>

                    {firmaURL && (
                        <div className="firma-preview">
                            <div>
                                <button className="btnSignature" onClick={() => descargarFirma("png")}>
                                    Download PNG
                                </button>
                                <button className="btnSignature" onClick={subirFirmaAlServidor}>
                                    Upload to Platform
                                </button>
                            </div>
                            <div>
                                <img src={firmaURL} alt="Firma guardada" className="firma-img" />
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export { UserprofileCanvas };