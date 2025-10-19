import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import DashbordContainer from './UI/Dashboard/DashbordContainer.js';
import authUser from './UI/Auth/LoginApi.js';
import Login from './UI/Auth/Login.js';
import  Transporter from './UI/Transporter.js'
import  Airport  from './UI/Airport.js';
import  TicketsContainer  from './UI/Tickets/TicketsContainer.js';
import { useEffect, useState } from 'react';

function App() {

  const [user,setUser] = useState(null);

  useEffect(()=>{
    async function fetchAuthUser(){
      const user_response =await  authUser();
      const data = await user_response.json();
      if(data.userName){
      setUser(data);
      }
      console.log(data);
    }
    fetchAuthUser();                 
  },[])

  return (
    <BrowserRouter>
    <Routes>   
     {/* <Airport/> */}
     {/* <TicketsContainer /> */}
     {
      <Route path="/" element={ user ? <DashbordContainer user = {user} /> : <Login /> } />
     }
    </Routes>
    </BrowserRouter>
  );
}

export default App;
