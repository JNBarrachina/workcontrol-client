import { useEffect, useState } from 'react';
import './DashboargetEmplooyeedsbyProjects.css';

const DashboargetEmplooyeedsbyProjects = () => {
    const [getpreviw, setpreview] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/fetchs/employeeds_projects')
            .then(res => res.json())
            .then(data => {
                //console.log('preview',data);
                setpreview(data[1]);
            })
            .catch(err => console.error(err));
    }, []);

    useEffect(()=>{

    },[getpreviw])

    return (
        <main id="DashboargetEmplooyeedsbyProjects">
            <table>
                <thead>
                    <tr>
                        {getpreviw.length > 0 && Object.keys(getpreviw[0]).map((key, index) => (
                            <th key={index}>{key}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {getpreviw.length > 0 && getpreviw.map((obj, i) => (
                        <tr key={i}>
                            {Object.values(obj).map((value, j) => (
                                <td key={j}>{value}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
};

export {
    DashboargetEmplooyeedsbyProjects
};