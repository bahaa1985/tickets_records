import {React,useState,useEffect} from 'react';

export const Employee = () =>{
    const [employees, setEmployees] = useState([]);

    useEffect(()=>{
        const fetchEmployees = async () => {
            const res = await fetch('/employees');
            const data = await res.json();
            setEmployees(data);
        }
        fetchEmployees();
    },[])

    return(
        <div>
            <h1>Employees</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Mobile</th>
                        <th>UserName</th>
                        <th>Password</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map((employee,index) => (
                            <tr key={index} contentEditable={true}>
                                <td>{employee.name}</td>
                                <td>{employee.mobile}</td>
                                <td>{employee.userName}</td>
                                <td>{employee.password}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
        
    )
}