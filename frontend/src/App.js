import logo from './logo.svg';
import './App.css';
import { Transporter } from './components/Transporter';
import { Airport } from './components/Airport';
import { Ticket } from './components/Ticket';

function App() {
  return (
    <div className="App">
     {/* <Airport/> */}
     <Ticket />
    </div>
  );
}

export default App;
