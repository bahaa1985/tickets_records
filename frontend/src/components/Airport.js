import React, { useState,useEffect } from 'react';

export const Airport = () => {
    const [airports, setAirports] = useState([]);

    useEffect(()=>{
        const fetchTransporters = async () => {
            const res = await fetch('/airports');
            const data = await res.json();
            setAirports(data);
        }
        fetchTransporters();
    },[])
    
    return(
        <div>
            <h1>AirPorts</h1>
            <table>
                <thead>
                    <tr>
                        <th>المدينة</th>
                        <th>كود</th>                        
                    </tr>
                </thead>
                <tbody>
                    {
                        airports.map((airport,index) => (
                            <tr key={index} contentEditable={true}>
                                <td>{airport.name}</td>
                                <td>{airport.code}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
        
    )
}