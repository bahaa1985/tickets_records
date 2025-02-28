import {React,useState,useEffect, Fragment} from 'react';
import {useForm} from 'react-hook-form';

export const Booking = () => {
    const [tickets, setTickets] = useState([]);
    const [fromAirports,setFromAirports] = useState([]);
    const [toAirports,setToAirports] = useState([]);
    const [selectedFromAirport, setSelectedFromAirport] = useState("");
    const [selectedToAirport, setSelectedToAirport] = useState("");
    const [passengersFields, setPassengersFields] = useState([{ name: "", mobile: "" }]);
    const [flightType, setFlightType] = useState("one-way");
    const [selectedAirports, setSelectedAirports] = useState([]);
    const [selectedTransporter,setSelectedTransporter]=useState("");
    const [transporters,setTransporters]=useState([]);
    const [companies,setCompanies]=useState([]);

    useEffect(()=>{
        const fetchAirports = async () => {
            const res = await fetch('/airports');                    
            const data = await res.json();                    
            setFromAirports(data);
            setToAirports(data);                      

        }
        const fetchTransporters = async () => {
            const res = await fetch('/transporters');
            const data = await res.json();
            console.log(data);
            
            setTransporters(data);
        }

        const fetchCompanies = async () => {
            const res = await fetch('/companies');
            const data = await res.json();
            setCompanies(data);
        }

        fetchAirports();
        fetchTransporters();
        fetchCompanies();

    },[])

    function handleAddPassengers(){
        setPassengersFields([...passengersFields,{ name: "", mobile: "" }]);
    }

    const handleFlightTypeChange = (event) => {
        setFlightType(event.target.value);
    };
    
    const handleToAirport = (event) => {
        setSelectedFromAirport(event.target.value)
        // console.log("event:",selectedFromAirport);
        const value = event.target.value;
        // toAirports=fromAirports.filter(airport=>airport.city !== value)
        setToAirports(
          fromAirports.filter(airport=>airport.name !== value)
        )
    };

    return(
        <div>
            <h1>Booking</h1>    
            <form>  
                {/* Choose flight type */}
                <div style={{ marginBottom: "20px" }}>
                    <label>Flight Type:</label>
                    <div>
                        <label style={{ marginRight: "10px" }}>
                        <input
                            type="radio"
                            value="one-way"
                            checked={flightType === "one-way"}
                            onChange={handleFlightTypeChange}
                        />
                        One Way
                        </label>
                        <label>
                        <input
                            type="radio"
                            value="return"
                            checked={flightType === "return"}
                            onChange={handleFlightTypeChange}
                        />
                        Return
                        </label>
                    </div>
                    <div>
                    <label>
                    تاريخ المغادرة
                        <input type="date"></input>
                    </label>
                    {
                        flightType === 'return' ?  
                        <label>
                        تاريخ العودة
                            <input type="date"></input>
                        </label> 
                        :null
                    }
                </div>
                </div>             
                {/* from and to airports */}
                <div>
                    <label>From:
                        <select 
                         onChange={(e)=>handleToAirport(e)}
                         value={selectedFromAirport}>
                            {
                                fromAirports.map((airport,index)=>(
                                    <option key={index} value={airport.name}>{airport.name}</option>
                                ))
                            }
                        </select>
                    </label>
                    <label>To:
                        <select onChange={(e)=>setSelectedToAirport(e.target.value)} value={selectedToAirport}>
                            {toAirports.map((airport,index)=>(
                                <option key={index} value={airport.code}>{airport.name}</option>
                            ))}
                        </select>
                    </label>
                </div>
                <div>
                    {
                        passengersFields.map((field,index)=>{
                            return(
                                <div key={index}>
                                    <input type="text" placeholder="اسم الراكب" onChange={(e)=>passengersFields[index].name=e.target.value}></input>
                                    <input type="text" placeholder="رقم الموبايل" onChange={(e)=>passengersFields[index].mobile=e.target.value}></input>
                                </div>
                            )                            
                        })          
                    }                                       
                </div>
                <div>
                    <input type="button" onClick={()=>handleAddPassengers()} value="إضافة راكب"></input>
                    <input type="button" onClick={()=>console.log("pf",selectedFromAirport,selectedToAirport)} value="rtyyy"></input>
                </div>
                {/* Aviation: */}
                <div>
                    <label>
                        شركة الطيران
                        <select onChange={(e)=>{setSelectedTransporter(e.target.value);console.log(selectedTransporter)}
                        } value={selectedTransporter}>
                            {
                                transporters.map((transporter,index)=>{
                                    return(                                                                       
                                        <option key={index} value={transporter._id}>                                           
                                           {transporter.name}                                           
                                        </option>                                     
                                    )
                                })
                            }
                        </select>
                        <img src={transporters.filter((transporter=>transporter._id===selectedTransporter)).image} alt="" />
                    </label>
                </div>
                
               <div>
            </div>
            {/* Fund */}
            <div>

            </div>
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