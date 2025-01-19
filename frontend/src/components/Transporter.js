import React, { useState,useEffect } from 'react';

export const Transporter = () => {
    const [transporters, setTransporters] = useState([]);

    useEffect(()=>{
        const fetchTransporters = async () => {
            const res = await fetch('/transporters');
            const data = await res.json();
            setTransporters(data);
        }
        fetchTransporters();
    },[])
    
    return(
        <div>
            <h1>Transporters</h1>
            <ul>
                {transporters.map(transporter => (
                    <li key={transporter.id} contentEditable={true}>{transporter.name}</li>
                ))}
            </ul>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>الاسم</th>                        
                    </tr>
                </thead>
                <tbody>
                    {
                        transporters.map((index,transporter)=>{
                            return(
                                <tr key={index}>
                                    <td>{transporter.logo}</td>
                                    <td>{transporter.name}</td>                                    
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
        
    )
}