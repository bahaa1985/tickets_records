import logo from './logo.svg';
import './App.css';
import { Transporter } from './components/Transporter';
import { Airport } from './components/Airport';
import { Tickets } from './components/Tickets';

function App() {
  return (
    <div className="App">
     {/* <Airport/> */}
     <Tickets />
    </div>
  );
}

export default App;
