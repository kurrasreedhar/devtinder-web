import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Body } from './components/Body';
import { Profile } from './components/Profile';
import {Login} from "./components/Login";
import { Feed } from './components/Feed';
import { Connections } from './components/Connections';
import { Requests } from './components/Request';

function App() {

  return (
    <div >
      
      <BrowserRouter basename='/'>
      <Routes>
        <Route path="/" element={<Body/>}>
            <Route path="/" element={<Feed/>}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/connections" element={<Connections/>}></Route>
        <Route path="/requests" element={<Requests/>}></Route>
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
