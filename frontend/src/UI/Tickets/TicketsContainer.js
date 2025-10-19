import React, { act, useState } from "react";
import { NewTicket } from "./NewTicket";
import TicketsList from "./TicketsList";

export default function TicketsContainer(){

    const actions={
        actionDis:'display',
        actionNew:'new'
    }
    const [action,setAction]=useState(actions.actionDis)
    return(
        <div>
            <div>
                <button onClick={()=>setAction(actions.actionDis)}>عرض</button>
                <button onClick={()=>setAction(actions.actionNew)}>جديد</button>
            </div>
            {
                action === actions.actionDis ?
                    <TicketsList />
                    :
                    <NewTicket />
            }
        </div>
    )
}