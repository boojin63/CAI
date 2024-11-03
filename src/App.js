import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Main from "./Components/Main";
import Notice from './Components/Notice';
import Record from './Components/Record';
import Analyze from './Components/Analyze';
import Community from './Components/Community';

function App () {

  return(
    <Router>
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/notice' element={<Notice/>}/>
        <Route path='/record' element={<Record/>}/>
        <Route path='/analyze' element={<Analyze/>}/>
        <Route path='/community' element={<Community/>}/>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;