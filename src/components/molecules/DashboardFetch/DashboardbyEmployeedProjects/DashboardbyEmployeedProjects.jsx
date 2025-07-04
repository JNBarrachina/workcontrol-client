import { useEffect, useState } from 'react';
import './DashboardbyEmplooyeedProjets.scss';

const DashboardbyEmplooyeedbyProjets = () => {
  const [getpreviw, setpreview] = useState([]);
  const user = JSON.parse (localStorage.getItem ("login"))
  useEffect(() => {
    fetch('http://localhost:3000/fetchs/employeed_assigned', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        rol: user.role,
        id: JSON.parse( localStorage.getItem('login') )?.id,
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log('Resultados del Backend ',data);
        setpreview(data);
      })
      .catch(err => console.log(err));
  }, []);  // Solo al montar

  return (
    <main id='main-dashboardbyemployeedprojects'>
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
  DashboardbyEmplooyeedbyProjets
};