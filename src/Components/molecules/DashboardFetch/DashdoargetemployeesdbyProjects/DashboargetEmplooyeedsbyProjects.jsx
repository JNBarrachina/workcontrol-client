import { useEffect, useState, Fragment } from 'react';

import './DashboargetEmplooyeedsbyProjects.scss'

const DashboargetEmplooyeedsbyProjects = () => {
    
    const [ getpreviw, setpreview] = useState([]);
    const [ getpreformated, setpreformated ] = useState();


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
                                    <details>
                                    <summary style={{ cursor: 'pointer' }}>
                                         SubProjects ({subprojects.length})
                                    </summary>

                                    {subprojects.map(([sub, date], idx) => (
                                        <section key={idx} >
                                            <p style={{ textAlign: 'start' }}>Subproject: {sub}</p>
                                            <p style={{ textAlign: 'start' }}>Date Assigned: {date}</p>
                                        </section>
                                    ))}
                                    </details>
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
        </main>
    );
};

export {
    DashboargetEmplooyeedsbyProjects
};