import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "./Components/AuthContext";
import Main from "./Components/Main";
import Notice from './Components/Notice';
import History from './Components/History';
import Analyze from './Components/Analyze';
import Community from './Components/Community';
import KaKaoRedirect from './Components/KaKaoRedirect';
import Callback from './Components/KaKaoCallback';
import History1 from './Components/History1';


function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/notice' element={<Notice />} />
          <Route path='/history' element={<History />} />
          <Route path='/analyze' element={<Analyze />} />
          <Route path='/community' element={<Community />} />
          <Route path='/oauth' element={<KaKaoRedirect />} />
          <Route path='/oauth/callback' element={<Callback />} />
          <Route path='/history1' element={<History1/>}/>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;