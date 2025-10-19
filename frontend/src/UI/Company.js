import React, { useState,useEffect } from 'react';

export const Company = () => {
    const [companys, setcompanys] = useState([]);

    useEffect(()=>{
        const fetchCompanies = async () => {
            const res = await fetch('/Companies');
            const data = await res.json();
            setcompanys(data);
        }
       fetchCompanies();
    },[])
    
    return(
        <div>
            <h1>companys</h1>
            <table>
             <thead>
                    <tr>
                        <th>إسم الشركة</th>
                        <th>رقم الموبايل</th>
                        <th>البريد الاليكتروني</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        companys.map((company,index) => (
                            <tr key={index} contentEditable={true}>
                                <td>{company.logo}</td>
                                <td>{company.name}</td>
                                <td>{company.mobile}</td>
                                <td>{company.email}</td>
                         </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
        
    )
}