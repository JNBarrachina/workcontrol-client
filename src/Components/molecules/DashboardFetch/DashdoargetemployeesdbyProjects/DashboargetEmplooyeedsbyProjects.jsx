import { useEffect, useState, Fragment, } from 'react';

import './DashboargetEmplooyeedsbyProjects.scss'

const DashboargetEmplooyeedsbyProjects = () => {
    
    const [ getpreviw, setpreview] = useState([]);
    const [ getpreformated, setpreformated ] = useState();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [getselectedSubprojects, setSelectedSubprojects] = useState(null);


    useEffect(() => {
        fetch('http://localhost:3000/fetchs/employeeds_projects')
            .then(res => res.json())
            .then(data => {
                //console.log('Preview',data[1]);
                setpreview(data[1]);
            })
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        // Ok, simularemos la prueba
        // Funciona, pero la Fecha de asignacion es la del proyeto asignado
        // no la del subproyecto asignado ya que no existe en la BBDD.
        //
        // Preformateo Employee Proyecto Subproyectos.
        const grouped = {};
        getpreviw.forEach(row => {
            const employee = row.Employeed;
            const project = row["Assigned Project"];
            const subproject = row["Assigned SubProject"];

            if (!grouped[employee]) {
            grouped[employee] = {};
            }

            if (!grouped[employee][project]) {
            grouped[employee][project] = [];
            }

            if (!grouped[employee][project].includes(subproject)) {
            grouped[employee][project].push([ subproject,row["Date Assigned"] ]);
            }
        });

        //console.log("Agrupado correctamente:", grouped);
        setpreformated(grouped)
    }, [getpreviw]);

    const previewProjects = ( subprojects ) => {
        setSelectedSubprojects( subprojects);
        setIsModalOpen(true);                
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    return (
        <main id="main-DashboargetEmplooyeedsbyProjects">
            <table>
                <thead>
                    <tr>
                        {getpreviw.length > 0 && Object.keys(getpreviw[0]).map((key, index) => (
                            <th key={index}>{key}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {
                        false &&
                        getpreviw.length > 0 && getpreviw.map((obj, i) => (
                            <tr key={i}>
                                        {Object.values(obj).map((value, j) => (
                                            <td key={j}>{value}</td>
                                        ))}
                            </tr>
                        ))
                    
                    }
                           
                    {
                        getpreformated &&
                        Object.entries(getpreformated).map(([employee, projects]) => (
                            <Fragment key={employee}>
                            {Object.entries(projects).map(([project, subprojects], i) => (
                                <tr key={`${employee}-${project}`} style={{ backgroundColor: 'white' }}>
                                {/* Columna 1: Empleado */}
                                {i === 0 && (
                                    <td rowSpan={Object.keys(projects).length} style={{ fontSize: '26px' }}>
                                    {employee}
                                    </td>
                                )}
                                {/* Columna 2: Proyecto */}
                                <td style={{ backgroundColor: 'white' }}>{project}</td>
                                {/* Columna 3: Subproyectos & fechas */}
                                <td style={{ backgroundColor: 'white' }} colSpan={2}>

                                    <button
                                        onClick={ () => previewProjects( subprojects ) }
                                    >
                                    SubProjects ({subprojects.length})
                                    </button>
                                </td>
                                </tr>
                            ))}
                            {/* Línea separadora */}
                            <tr>
                                <td colSpan={4} className='separate'></td>
                            </tr>
                            </Fragment>
                        ))
                    }
                </tbody>
            </table>

            {/* Overlay y Modal */}
            {isModalOpen && (
                <div style={{
                    position: 'absolute',
                    zIndex:'100',
                    top:'8%',
                    left:'28%',
                    right:'28%',
                    padding:'10px',
                    background:'rgba(0, 0, 0, 0.89)',
                    borderRadius: '12px',
                    }}>
                    <div style={{display:'flex',flexDirection:'column',  overflowY:'auto', height:'40rem'}}>
                        <div style={{display: 'flex', justifyContent: 'flex-end', width:'100%', padding:'10px'}}>
                            <button 
                                onClick={ closeModal}
                                style={{
                                    fontSize: '0.35rem',
                                    cursor: 'pointer',
                                    background: '#fff',
                                    border: '1px solid #000',
                                    borderRadius:'12px',
                                }}
                            >
                                <img src="/src/assets/deletecross.svg" alt="Close" />
                            </button>
                        </div>
                        <div style={{display: 'flex', flexDirection:'column', justifyContent: 'center', marginRight:'3rem'}}>
                            {getselectedSubprojects?.map(([sub, date], idx) => (
                                <div key={idx} style={{marginBottom: '1rem'}}>
                                    <p style={{
                                        padding:'10px 0 10px 20px',
                                        width: '100%',
                                        textAlign: 'start',
                                        background: 'linear-gradient(90deg,rgba(252, 6, 174, 1) 0%, rgba(208, 0, 210, 1) 50%, rgba(148, 1, 248, 1) 100%)',
                                        color: '#fff',
                                        fontWeight: 'bold',
                                        margin: '0.5rem 0',
                                        border: '1px solid #000',
                                        borderRadius:'12px',
                                    }}>
                                        Subproject: {sub}
                                    </p>
                                    <p style={{
                                        padding:'10px 0 10px 20px',
                                        width: '100%',
                                        textAlign: 'start',
                                        fontWeight: 'bold',
                                        background: 'linear-gradient(90deg,rgba(252, 6, 174, 1) 0%, rgba(208, 0, 210, 1) 50%, rgba(148, 1, 248, 1) 100%)',
                                        color: '#fff',
                                        margin: '0.5rem 0',
                                        border: '1px solid #000',
                                        borderRadius:'12px',
                                    }}>
                                        Date Assigned: {date}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

        </main>
    );
};

export {
    DashboargetEmplooyeedsbyProjects
};