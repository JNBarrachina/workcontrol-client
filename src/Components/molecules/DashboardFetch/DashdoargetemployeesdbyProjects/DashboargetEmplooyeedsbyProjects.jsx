import { useEffect, useState } from 'react';

import './DashboargetEmplooyeedsbyProjects.scss'

const DashboargetEmplooyeedsbyProjects = () => {
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
        fetch('http://localhost:3000/fetchs/employeeds_projects')
            .then(res => res.json())
            .then(data => {
                console.log('preview',data[1]);
                const data2 = simp (data[1])
                setpreview(data2);
            })
            .catch(err => console.error(err));
    }, []);

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