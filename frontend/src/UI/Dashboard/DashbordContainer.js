import React from "react";
import { useEffect,useState } from "react";
import Login from "../Auth/Login.js";
import TicketsContainer from "../Tickets/TicketsContainer";
import FinanceContainer from "../finance/FinanceConatainer";

export default function DashbordContainer(props){

    const user = props.user;
    // const [user,setUser] = useState([]);
    const [isAuthenticated,setAuthenticatd]=useState(false);
    const [clickedButton,setClickedButton] = useState(0);
    return(
        <div>
            {
                !user ?
                <div>
                    <Login />
                </div>:
                <>
                 <div className="w-48 h-full ml-auto flex flex-col items-stretch justify-center">
                    <span></span>
                    <button onClick={()=>setClickedButton(0)}>تذاكر</button>
                    <button onClick={()=>setClickedButton(1)}>الحسابات</button>
                    <button onClick={()=>setClickedButton(2)}>المستخدمين</button>
                    <button onClick={()=>setClickedButton(3)}>الإعدادت</button>
                    <button onClick={()=>setClickedButton(4)}></button>
                    <button onClick={()=>setClickedButton(5)}></button>
                </div>
                {
                    clickedButton === 0 ? <TicketsContainer user={user} /> :
                    clickedButton === 1 ? <FinanceContainer user={user} /> :
                    null                    
                }
                </>                                                  
            }
        </div>
    )
}