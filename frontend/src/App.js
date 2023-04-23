import logo from './logo.svg';
import './App.css';
import { Routes } from 'react-router-dom';
import Allroute from './routes/Allroute';
import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from './pages/Navbar';
import { Container } from '@chakra-ui/react';


function App() {
  
  return (
   <>
   <Navbar/>
  <Allroute/>

   </>
   
  );
}

export default App;
