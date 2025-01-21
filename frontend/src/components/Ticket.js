import {React,useState,useEffect} from 'react';
import {useForm} from 'react-hook-form';

export const Ticket = () => {
    const [tickets, setTickets] = useState([]);
    const [flightOneWay,setFlightOneWay]=useState(false);

    useEffect(()=>{
        const fetchTickets = async () => {
            const res = await fetch('/tickets');
            const data = await res.json();
            setTickets(data);
        }
        fetchTickets();
    },[])
    
    return(
        <div>
            <h1>Tickets</h1>
            {/* new ticket: */}
            <form>              
                <input type="checkbox" onChecked={()=>setFlightOneWay(true)}>رحلة ذهاب</input>
                <input type="checkbox" onChecked={()=>setFlightOneWay(false)}>رحلة ذهاب و عودة</input>
                <input type="text" placeholder="اسم الراكب" />                
                <input type="text" placeholder="رقم الموبايل" />
                <input type="date" placeholder="تاريخ الحجز" />
                <div>
                    <input type="date" placeholder="تاريخ المغادرة" />
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
                    <input type="date" placeholder="تاريخ العودة" />
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
            <table>  
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
                                <td>{ticket.flight}</td>
                                <td>{ticket.passenger}</td>
                                <td>{ticket.seat}</td>
                                <td>{ticket.price}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
        
    )
}