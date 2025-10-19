import React, { useState,useEffect } from 'react';
import { financeData } from './FinanceApi.js';

export default function FinanceContainer(){

    const [financeList,setFinanceList] = useState([]);
    const [startDate,setStartDate] = useState("");
    const [endDate,setEndDate] = useState("");
    const [isClicked,setIsClicked] = useState(false);

    useEffect(()=>{
        async function fetchFinance(){
            const response = await financeData(startDate,endDate);
            const data = await response.json();
            setFinanceList(data);
            setIsClicked(false);
            console.log("finance",data);
        }

        if(isClicked){
            fetchFinance();
        }
    },[startDate,endDate,isClicked])

    return(
        <div>
            <div className='w-1/2 flex flex-row justify-around'>
                <label>Start Date:</label>
                <input type='date' className='border-2 border-gray-300 rounded-md' onChange={(e)=>setStartDate(e.target.value)}/>
                <label>End Date:</label>
                <input type='date' className='border-2 border-gray-300 rounded-md' onChange={(e)=>setEndDate(e.target.value)}/>
            </div>
            <div>
                <button type='button' className='w-20 h-12 flex justify-center items-center bg-blue-500 text-slate-50 rounded-xl' onClick={()=>setIsClicked(true)}>Confirm</button>
            </div>
            <div>
                <span>Finance</span>
                {
                    financeList.length >0  ? 
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Company Name</th>
                                <th>Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                financeList.map((recorder,index)=>{
                                    return(
                                        <tr key={index}>
                                            <td>{new Date(recorder._id).toLocaleDateString()}</td>
                                            <td>{recorder.companyName}</td>
                                            <td>{recorder.totalPrice}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>  
                    : <span>No Data Found</span>                                        
                }
            </div>
        </div>
    )
}