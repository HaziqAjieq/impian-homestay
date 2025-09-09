import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Home from "./pages/public/Home";
import Navbar from "./components/navigation/Navbar";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col ">
          {/* navbar goes here */}
          
          <Navbar/>
          <main className="flex-grow-1 ">
            {/* entire web page goes here */}
            <Routes>
              {/* homepage */}
              <Route path="/" element={<Home/>}/>
              {/*  properties list with card */}

              {/* attraction in the area */}
              {/* login page */}

              {/*  */}
              {/* booking page */}
            </Routes>

          </main>
          {/* footer goes here */}
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

// all routing goes here, including protected route
