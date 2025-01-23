import {React,useState,useEffect, Fragment} from 'react';
import {useForm} from 'react-hook-form';

export const Ticket = () => {
    const [tickets, setTickets] = useState([]);
    const[passengersCount,setPassengerCount]=useState(1);
    const [passengersFields, setPassengersFields] = useState([{ name: "", mobile: "" }]);
    const [flightOneWay,setFlightOneWay]=useState(false);

    useEffect(()=>{
        // const fetchTickets = async () => {
        //     const res = await fetch('/tickets');
        //     const data = await res.json();
        //     setTickets(data);
        // }
        // fetchTickets();
    },[])

    const handleAddPassengers = () => {
        if(passengersCount > 1 && passengersCount < 10){ 
            for(let i = 0 ;i <passengersCount ; i++ ){
                passengersFields.push({ name: "", mobile: "" })
            }
        }
        const arr= passengersFields.map((field,index)=>{
            return(
            <div>                 
                <input type="text" placeholder="اسم الراكب"></input>             
                <input type="text" placeholder="رقم الموبايل"></input>
            </div>
            ) 
        })
        console.log(arr);
        
               return arr;
    }
    
    return(
        <div>
            <h1>Tickets</h1>
            {/* new ticket: */}
            <form>              
                <input type="checkbox" onChecked={()=>setFlightOneWay(true)}></input>
                <input type="checkbox" onChecked={()=>setFlightOneWay(false)}></input>               
                <input type="date" placeholder="تاريخ الحجز"></input>
                <input type="text" placeholder="عدد الركاب" onChange={(e)=>setPassengerCount(e.target.value)} ></input>
                <div>
                    <input type="text" placeholder="اسم الراكب"></input>
                    <input type="text" placeholder="رقم الموبايل"></input>
                    {
                        handleAddPassengers           
                    }                                       
                </div>
                <div>
                    <input type="date" placeholder="تاريخ المغادرة"></input>
                    <select>
                        <option>من</option>
                    </select>   
                    <select>
                        <option>إلى</option>
                    </select>   
                </div>
               <div>

               </div>
                {
                    flightOneWay ? null : 
                    <div>
                    <input type="date" placeholder="تاريخ العودة"></input>
                    <select>
                        <option>من</option>
                    </select>   
                    <select>
                        <option>إلى</option>
                    </select>   
                    </div>                    
                } 
                
                     
            </form>

            {/* all tickets: */}
            {/* <table>  
                <thead>
                    <tr>
                        <th>اسم الراكب</th>
                        <th>رقم الموبايل</th>
                        <th>تاريخ الحجز</th>
                        <th>تاريخ المغادرة</th>
                        <th>تاريخ العودة</th>
                        <th>من</th>
                        <th>إلى</th>
                        <th>شركة الطيران</th>
                        <th>شركة الحجز</th>
                        <th>سعر التكلفة</th>
                        <th>السعر</th>
                        <th>المتبقى</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tickets.map((ticket,index) => (
                            <tr key={index} contentEditable={true}>
                                {
                                    ticket.passengers.map((passenger,index)=>(
                                        <tr key={index}>
                                            <td>{passenger.passengerName}</td>
                                            <td>{passenger.passengerMobile}</td>
                                        </tr>
                                    ))
                                }
                                {
                                    ticket.flights.length> 0 ?
                                    ticket.flights.map((flight,index)=>(
                                        <tr key={index}>
                                            <td>{flight.flightType}</td>
                                            <td>{flight.depAirportId}</td>
                                            <td>{flight.arrAirportId}</td>
                                            <td>{flight.transporterId}</td>
                                        </tr>
                                    ))
                                    :null
                                }
                                <td>{ticket.departureDate}</td>
                                <td>{ticket.returnDate}</td>
                                <td>{ticket.companyId}</td>
                                <td>{ticket.price}</td>
                                <td>{ticket.remain}</td>
                                <td>{ticket.employeeId}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table> */}
        </div>
        
    )
}