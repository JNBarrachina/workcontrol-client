import { useEffect, useState } from 'react';
import './DashboardbyEmplooyeedProjets.css';

const DashboardbyEmplooyeedProjets = () => {

 const [getpreviw, setpreview] = useState([])

useEffect(() => {
    fetch('http://localhost:3000/employeed_assigned', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            rol: "user",
            name: "Julian"
        })
    })
    .then(res => res.json())
    .then(data => {
        setpreview(data);
    })
    .catch(err => console.log(err));
}, []);


return(
            <main id ="DashboardbyEmplooyeedProjets">
                <table>
                    <thead>
                        <tr>
                            {getpreviw[0] && Object.keys(getpreviw[0]).map((key, index) => (
                                <th key={index}>{key}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                    {getpreviw.map((obj, i) => (
                        <tr key={i}>
                            {Object.values(obj).map((value, j) => (
                                <td key={j}>{value}</td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </main>
)

}

export {
    DashboardbyEmplooyeedProjets
}