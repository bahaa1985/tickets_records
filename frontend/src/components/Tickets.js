import {React,useState,useEffect, Fragment} from 'react';
import {useForm} from 'react-hook-form';
import createTicket from './Fetching/Ticket';

export const Tickets = () => {
    const [tickets, setTickets] = useState([]);
    const [departureDate,setDepartureDate] = useState(Date.now());
    const [returnDate,setReturnDate] = useState(null);
    const [fromAirports,setFromAirports] = useState([]);
    const [toAirports,setToAirports] = useState([]);
    const [selectedFromAirport, setSelectedFromAirport] = useState(0);
    const [selectedToAirport, setSelectedToAirport] = useState("");

    const [passengersFields, setPassengersFields] = useState([{ name: "", mobile: "" }]);
    const [flightType, setFlightType] = useState(0);

    const [transporters,setTransporters]=useState([]);
    const [selectedTransporter,setSelectedTransporter]=useState("");
    
    const [companies,setCompanies]=useState([]);
    const [selectedCompany,setSelectedCompany]= useState(0);

    const [price,setPrice]= useState(0);
    const [salePrice,setSalePrice]= useState(0);
    const [payed,setPayed]= useState(0);
    const [remain,setRemain]= useState(salePrice - payed);

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

    function handleSubmit(e){
        e.preventDefault();

        const bookingDate = new Date();              
        const flights = [
            {
                flightType: flightType === 0 ? "oneWay" : "roundTrip",  
                depAirportId: selectedFromAirport,
                arrAirportId: selectedToAirport,        
                transporterId: selectedTransporter
            }
        ];

        const ticket = {
            passengers: passengersFields.map((passenger) => ({
                passengerName: passenger.name,
                passengerMobile: passenger.mobile
            })),
            bookingDate: bookingDate,
            departureDate: departureDate,
            returnDate: returnDate,
            flightType : flightType,
            flights: flights,
            transporterId: selectedTransporter,
            companyId: selectedCompany,
            price: price,
            salePrice: salePrice,
            payed: payed,
            remain: remain,
            employeeId: "123456789" 
        };
        console.log(ticket);    
        createTicket(ticket.passengers, ticket.bookingDate, ticket.departureDate, ticket.returnDate, ticket.flights, ticket.transporterId, ticket.companyId, ticket.price, ticket.salePrice, ticket.payed, ticket.remain, ticket.employeeId)
        .then((data) => {   
            console.log(data);
            setTickets([...tickets, data]);
        })
        .catch((error) => { 
            console.error("Error:", error);
        });
    }

    function handleAddPassengers(handleType){
        if(handleType === "add"){
            setPassengersFields([...passengersFields,{ name: "", mobile: "" }]);
        }
        else if(handleType === "remove"){
            setPassengersFields(passengersFields.filter((_,index)=>index !== passengersFields.length-1));            
        }
    }

    const handleFlightTypeChange = (value) => {
        setFlightType(value);
        
    };
    
    const handleToAirport = (value) => {
        if(value !== -1){
            setSelectedFromAirport(value)
            setToAirports(
            fromAirports.filter(airport=>airport.name !== value)
        )
        }
        
    };
    return(
        <div dir='rtl'>
            <h1>Booking</h1>    
            <form onSubmit={(e)=>createTicket(e)}>  
                {/* Choose flight type */}
                <div style={{ marginBottom: "20px" }}>
                    <label>نوع الرحلة:</label>
                    <div>
                        <label style={{ marginRight: "10px" }}>
                        <input id="oneWayradio"  type="radio" defaultChecked={true} checked={flightType === 0 ? true : false}  onChange={()=>handleFlightTypeChange(0)}/>
                        رحلة ذهاب
                        </label>
                        <label>
                        <input id="roundTripradio"  type="radio" defaultChecked={false} checked={flightType === 1 ? true : false}  onChange={()=>handleFlightTypeChange(1)}
                        />
                        رحلة ذهاب و عودة
                        </label>
                    </div>
                    <div>
                    <label>
                    تاريخ المغادرة
                        <input id="deaprtureDate" type="date" onChange={(e)=>setDepartureDate(e.target.value)}></input>
                    </label>
                    {
                        flightType === 1 ?  
                        <label>
                        تاريخ العودة
                            <input id="returnDate" type="date" onChange={(e)=>setReturnDate(e.target.value)}></input>
                        </label> 
                        :null
                    }
                </div>
                </div>             
                {/* from and to airports */}
                <div>
                    <label>From:
                        <select 
                         onChange={(e)=>handleToAirport(e.target.value)}
                         value={selectedFromAirport}>
                            <option value={-1}>اختر مطار</option>
                            {
                                fromAirports.map((airport,index)=>(
                                    <option key={index} value={airport.name}>{airport.name}</option>
                                ))
                            }
                        </select>
                    </label>
                    <br/>
                    <label>To:
                        <select onChange={(e)=>setSelectedToAirport(e.target.value)} value={selectedToAirport}>                            
                            <option value={-1}>اختر مطار</option>
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
                    <input type="button" onClick={()=>handleAddPassengers('add')} value="إضافة راكب"></input>                  
                    <input type="button" onClick={()=>handleAddPassengers('remove')} value="حذف راكب"></input>
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
                <label>
                    سعر التكلفة
                    <input type="text" placeholder="سعر التكلفة" onChange={(e)=>{setPrice(e.value.target)}}></input>
                </label>
                <label>
                    سعر البيع
                    <input type="text" placeholder="سعر البيع" onChange={(e)=>{setSalePrice(e.target.value)}}></input>                
                </label>
                <label>
                    المبلغ المدفوع
                    <input type="text" placeholder="المبلغ المدفوع" onChange={(e)=>{setPayed(e.target.value)}}></input>  
                </label>
                <label>
                    المتبقى
                    <input type="text" placeholder="المتبقى" onChange={(e)=>{setRemain(e.target.value)}}></input> 
                </label>
            </div>
            {/*  */}
                <button type="submit">تسجيل</button>
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