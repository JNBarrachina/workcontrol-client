import { useEffect, useState } from 'react';
import './DashboardbyEmplooyeedProjets.scss';


const DashboardbyEmployeedbyProjets = () => {
  const [getpreviw, setpreview] = useState([]);
  const user = JSON.parse (localStorage.getItem ("login"))
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
        const data2 = simp (data)
        setpreview(data2);
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
              {Object.values(obj).map((value, j) => <td key={j}>{value}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export {
  DashboardbyEmployeedbyProjets
}