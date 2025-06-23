import { useEffect, useState } from 'react'


const DashboardbyEmplooyeedbyProjets = () => {

 const [getpreviw, setpreview] = useState([])
//User
useEffect(() => {
    fetch('http://localhost:3000/fetchs/employeed_assigned', {
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
            <div>
                <table>
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
            </div>
)

}

export {
    DashboardbyEmplooyeedbyProjets
}
