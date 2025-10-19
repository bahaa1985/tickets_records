import React, { useEffect, useState } from "react";
import { getTickets,updateTicket } from "./TicketApi.js";

export default function TicketsList(){

    const [isLoaded,setLoaded] = useState(false);
    const [transporters, setTransporters] = useState([]);
    const [selectedTransporter, setSelectedTransporter] = useState("");
    const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState("");
    const [fromAirports, setFromAirports] = useState([]);
    const [toAirports, setToAirports] = useState([]);
    const [selectedFromAirport, setSelectedFromAirport] = useState(0);
    const [selectedToAirport, setSelectedToAirport] = useState("");
    const [flights,setFlights] = useState([]);
    const [tickets,setTickets] = useState([]);
    const [selectedTicket,setSelectedTicket] = useState(0);

    useEffect(()=>{

        const fetchAirports = async () => {
        const res = await fetch("/airports");
        const data = await res.json();
        setFromAirports(data);
        setToAirports(data);
        };

        const fetchTransporters = async () => {
        const res = await fetch("/transporters");
        const data = await res.json();
        setTransporters(data);
        // setSelectedTransporter(data[0]._id); // Set default transporter
        };

        const fetchCompanies = async () => {
        const res = await fetch("/companies");
        const data = await res.json();
        setCompanies(data);
        // setSelectedCompany(data[0]._id); // Set default company
        };

        const fetchTickets = async() =>{
            const tickets = await getTickets();
                console.log(tickets);            
                setTickets(tickets);
                setLoaded(true);              
        }

        try{
            fetchAirports();
            fetchTransporters();
            fetchCompanies();
            fetchTickets();            
        }
        catch(e){
            console.log(e.message);            
        }
        
    },[])
    
    
    function updateDataField(ticketId,property,event){
         const newTickets = [...tickets] ;
                const targetTicket = newTickets.find((elem) => elem._id === ticketId)
                const propertiesArr = property.split('.');
                if(propertiesArr.length < 2){
                    targetTicket[property] = event.target.value;
                }
                else{
                    const parentProp = propertiesArr[0].substring(0,propertiesArr[0].indexOf('['));
                    const index = propertiesArr[0].substring(propertiesArr[0].indexOf('[',propertiesArr[0])+1,propertiesArr[0].indexOf(']'))
                    const subProp = propertiesArr[1];
                    //
                    targetTicket[parentProp][index][subProp] = event.target.value;

                }
                setTickets(newTickets);                
    }

    function handleUpdating(id,ticket){
        try{            
            updateTicket(id,ticket)
            .then(data=>{
                if(data){
                    console.log("Response status:", "Ticket updated successfully!",data);
                }
            })
        }
        catch(e){
            console.log("Error",e);
        }        
    }

    return(
        <div>
            <table className='table-auto w-full border-collapse border border-slate-400'>
                {/* <thead>
                    <th>Booking Date</th>
                    <th>Passenger</th>
                    <th>Mobile</th>
                    <th>Departure Date</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Agency</th>
                    <th>Return Date</th>
                    <th>From</th>                    
                    <th>To</th>
                    <th>Agency</th>
                    <th>Aviation</th>
                    <th>Price</th>
                    <th>Sale Price</th>
                    <th>Payed</th>
                    <th>Remain</th>
                    <th>Notes</th>
                </thead>  */}
                <tbody>
{
tickets?.map((ticket)=>{
                    return(
                        <>
                        <tr key={ticket._id} className="border border-solid border-slate-900 m-2 p-2" style={{border:"1px solid black",margin:"10px",padding:"10px"}}>
                            <td className="text-lg bg-skate-400 text-center p-2">Booking Date: {new Date(ticket.bookingDate).toLocaleDateString()}</td>
                            <td>Name:
                            {
                                ticket.passengers.map((passenger,index)=>{
                                    return(
                                        <div key={index} style={{margin:"5px",padding:"5px"}}>
                                            <input type="text" key={index} style={{margin:"5px",padding:"5px"}}
                                                contentEditable={true}
                                                value={passenger.passengerName}
                                                        onChange={(e)=>{
                                                            updateDataField(ticket._id,`passengers[${index}].passengerName`,e)                                                            
                                                            }
                                                    
                                                    }>
                                            </input>
                                        </div>
                                    )
                                })
                            }
                            </td>
                            <td>Mobile: 
                            {
                                ticket.passengers.map((passenger,index)=>{
                                    return(
                                        <div key={index} style={{margin:"5px",padding:"5px"}}>
                                            
                                            <input type="text" 
                                                value={passenger.passengerMobile}
                                                onChange={(e)=>{
                                                    updateDataField(ticket._id,`passengers[${index}].passengerMobile`,e);
                                                }}></input>
                                        </div>
                                    )
                                })
                            }
                            </td>
                            <td className="text-lg bg-skate-400 text-center p-2">Departure Date: {new Date(ticket.departureDate).toLocaleDateString()}</td>
                            <td>From:
                                <select value={ticket.flights[0].depAirportId} 
                                    onChange={(e)=>{
                                            updateDataField(ticket._id,`flights[0].depAirportId`,e);
                                        }
                                    }>
                                    {
                                        fromAirports.map((airport)=>{
                                            return(
                                                <option key={airport._id} value={airport.code} selected={airport.code=== ticket.flights[0].depAirportId}>
                                                    {airport.name}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </td>
                            <td>To:
                                <select value={ticket.flights[0].arrAirportId} 
                                onChange={(e)=>{
                                            updateDataField(ticket._id,'flights[0].arrAirportId',e)
                                        }
                                    }>
                                    {
                                        toAirports.map((airport)=>{
                                            return(
                                                <option key={airport._id} value={airport.code} selected={airport.code === ticket.flights[0].arrAirportId}>
                                                    {airport.name}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </td>
                            <td className="text-lg bg-skate-400 text-center p-2">Return Date: {ticket.returnDate ? new Date(ticket.returnDate).toLocaleDateString() : "N/A"}</td>                                                        
                        </tr>

                        <button onClick={()=>setSelectedTicket(ticket._id)}>Details</button>
                        {
                            selectedTicket === ticket._id ?
                            <tr>
                                <td className="text-lg bg-skate-400 text-center p-2">Price: 
                                    <input type="text"
                                            value={ticket.price}
                                            onChange={(e)=>{
                                                updateDataField(ticket._id,'price',e)
                                            }}></input>
                                    </td>
                                <td className="text-lg bg-skate-400 text-center p-2">Sale Price: 
                                    <input type="text"
                                            value={ticket.salePrice}
                                            contentEditable
                                            onChange={(e)=>{
                                                updateDataField(ticket._id,'salePrice',e)
                                            }}></input>
                                    </td>
                                <td className="text-lg bg-skate-400 text-center p-2">Payed: 
                                    <input type="text"
                                            value={ticket.payed}
                                            onChange={(e)=>{
                                                updateDataField(ticket._id,'payed',e)
                                            }}></input>
                                    </td>
                                <td className="text-lg bg-skate-400 text-center p-2">Remain: 
                                    <input type="text"
                                            value={ticket.remain}
                                            onChange={(e)=>{
                                                updateDataField(ticket._id,'remain',e)
                                            }}></input>
                                    </td>
                                <td className="text-lg bg-skate-400 text-center p-2">Notes: 
                                    <input type="text"
                                            value={ticket.notes}
                                            onChange={(e)=>{
                                                updateDataField(ticket._id,'notes',e)
                                            }}></input>
                                    </td>
                            </tr>                                     
                            : null
                        }
                        <button type="submit" className="bg-amber-400 w-32 rounded-xl" onClick={()=>[console.log(ticket),handleUpdating(ticket._id,ticket)]}>Updaet</button>
                        </>
                    )
                })
                } 
                </tbody>
                  
            </table>                        
        </div>
    )
}