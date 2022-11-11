import logo from './logo.svg';
import './App.css';
import {
  Route,
  Routes,
  HashRouter,
  NavLink
} from "react-router-dom";
import Login from './Components/Login';
import Schedule from './Components/Schedule';
import {useState} from 'react'
import Clients from './Components/Clients';
import Employees from './Components/Employees';
import AddClient from './Components/AddClient';
import EditClient from './Components/EditClient';
import AddEmployee from './Components/AddEmployee';
import EditEmployee from './Components/EditEmployee';

function App() {
  const [token, setToken] = useState();
  const [enableMenu, setEnableMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  
  if(!token) {
    return (
      <div>
        {loading&&
        <div className="loader-container">
          <div className="spinner"></div>
        </div> } 
        <Login setToken={setToken} loadingFunc={setLoading}/>
      </div>
    )
  }
  function toggleMenu(value){
    setEnableMenu(!value)
  }
  // console.log(`token:${JSON.stringify(token)}`);
  return (
    <HashRouter>
      {loading&&
        <div className="loader-container">
          <div className="spinner"></div>
        </div>}
      <div className="text-right">
        <i
          className="fas fa-bars menu-bar-icon"
          style={{fontSize: "40px", paddingRight:"15px"}}
          onClick={() => toggleMenu(enableMenu)}
        >
        </i>
        <div className="mobile-menu-area">
          {enableMenu && 
            <ul className="header">
              <li><NavLink onClick={()=>toggleMenu(enableMenu)} to="/">Scheduler</NavLink></li>
              <li><NavLink onClick={()=>toggleMenu(enableMenu)}  to="/clients">Clients</NavLink></li>
              <li><NavLink onClick={()=>toggleMenu(enableMenu)}  to="/employees">Employees</NavLink></li>
          </ul>
          }
        </div>
      </div>

      <Routes>
      <Route path="/" element={<Schedule loadingFunc={setLoading}/>} exact />
      <Route path="/clients" element={<Clients loadingFunc={setLoading}/>} exact />
      <Route path="/clients/new" element={<AddClient loadingFunc={setLoading}/>} exact />
      <Route path="/clients/:id/edit" element={<EditClient loadingFunc={setLoading}/>} exact />
      <Route path="/employees" element={<Employees loadingFunc={setLoading}/>} exact />
      <Route path="/employees/new" element={<AddEmployee loadingFunc={setLoading}/>} exact />
      <Route path="/employees/:id/edit" element={<EditEmployee loadingFunc={setLoading}/>} exact />
      </Routes>
      <div>Version:11.11.2022.2</div>
    </HashRouter>
  );
}

export default App;
