import { useEffect, useState } from 'react';

import './DashboardEmplooyeedProjets.scss';

let a = 0
let encabezado[] = ["",""]

const DashboardbyEmplooyeedbyProjets = () => {
  const [getpreviw, setpreview] = useState([]);
  function simp(data) {
    if (!Array.isArray(data) || data.length === 0) return data;
  
    const compare = [data[0].Employeed, data[0]["Assigned Project"]];
  
    for (let i = 1; i < data.length; i++) {
      if (data[i].Employeed === compare[0]) {
        data[i].Employeed = "";
      } else {
        compare[0] = data[i].Employeed;
      }
  
      if (data[i]["Assigned Project"] === compare[1]) {
        data[i]["Assigned Project"] = "";
      } else {
        compare[1] = data[i]["Assigned Project"];
      }
    }
  
    return data;
  }
  useEffect(() => {
    console.log (encabezado)
    fetch('http://localhost:3000/fetchs/employeed_assigned')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        const data2 = simp (data)
        setpreview(data2);
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
        {<tbody>
          {getpreviw.length > 0 && getpreviw.map((obj, i) => (
            <tr key={i}>
              {Object.values(obj).map((value, j) => console.log (value))}
            </tr>
          ))}
        </tbody>}
      </table>
    </main>
  );
};

export {
  DashboardbyEmplooyeedbyProjets
};