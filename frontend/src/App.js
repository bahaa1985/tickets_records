import logo from './logo.svg';
import './App.css';
import { Transporter } from './components/Transporter';
import { Airport } from './components/Airport';
import { Booking } from './components/Booking';

function App() {
  return (
    <div className="App">
     {/* <Airport/> */}
     <Booking />
    </div>
  );
}

export default App;
