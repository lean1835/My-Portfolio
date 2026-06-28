import React from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { About, Education, Experience, Hero, Navbar, Tech, Works, StarsCanvas } from './components'
import UiaCanvas from './components/canvas/UiaCanvas.jsx'

function App() {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-black">
        <div>
          <Navbar />
          <Hero />
        </div>
        <About />
        <Education />
        <Experience />
        <Tech />
        <Works />
        <div className="relative z-0">
          <StarsCanvas />
        </div>
        <UiaCanvas />
      </div>
    </BrowserRouter>
  );
}

export default App;
