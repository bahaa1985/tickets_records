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
            <ul>
                {airports.map(airport => (
                    <li key={airport.id} contentEditable={true}>{airport.name}</li>
                ))}
            </ul>
        </div>
        
    )
}