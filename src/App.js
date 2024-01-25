import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import NoPageFound from './components/NoPageFound';
import NavBar from './components/NavBar';
import User from './components/User';
import Add from './components/Add';

function App() {
  return (
    <div>
      <BrowserRouter>
      <NavBar/>
          <Routes>
            <Route path="/" element={<Home/> }> </Route> 
            <Route path="/about" element={<About/> }> </Route> 
            <Route path="/user" element={<User/> }> </Route> 
            <Route path="*" element={<NoPageFound/> }> </Route> 
            <Route path="/user/add" element={<Add/> }> </Route> 

          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
