import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PropertyPage from "./pages/public/PropertyPage";
import Home from "./pages/public/Home";
import Navbar from "./components/navigation/Navbar";
import Property from "./pages/public/Property";
import About from "./pages/public/About";

function App() {
  return (
  
      <Router>
        <div className="min-h-screen flex flex-col  transition-all">
          {/* navbar goes here */}
          
          <Navbar/>
          <main className="flex-grow-1 ">
            {/* entire web page goes here */}
            <Routes>
              {/* homepage */}
              <Route path="/" element={<Home/>}/>
              {/* about page */}
              <Route path="/about" element={<About/>}/>
              {/*  properties list with card */}
              <Route path="/property" element={<Property/>}/>
              {/* <Route path="/property" element={<Property/>} /> */}
              {/*  */}
              {/* booking page */}
              <Route path="/property/:slug" element={<PropertyPage/>}/>
            </Routes>

          </main>
          {/* footer goes here */}
        </div>
      </Router>
   
  );
}

export default App;

// all routing goes here, including protected route
