import { useEffect, useState } from 'react';

import './DashboardEmplooyeedProjets.scss';

const DashboardbyEmplooyeedbyProjets = () => {
  const [getpreviw, setpreview] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3000/fetchs/employeed_assigned')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        setpreview(data);
    })
    .catch(err => console.log(err));
  }, []);  // Solo al montar

  return (
    <main id='main-dashboardemployedproyects'>
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