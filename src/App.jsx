import { useState } from 'react'
import './App.css'
import CustomNavbar from './components/CustomNavbar'
import Home from './Pages/Home'
import { Routes, Route } from 'react-router-dom'
import Aboutus from './Pages/Aboutus'
import Track from './Pages/Track'
import Contactus from './Pages/Contactus'
import Terms from './Pages/Terms'
import Privacy from './Pages/Privacy'
import Shipping from './Pages/Shipping'

function App() {
  const [count, setCount] = useState(0)
  return (
    <>  
        <CustomNavbar />
       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Aboutus />} />
          <Route path="/track" element={<Track />} />
          <Route path="/contact" element={<Contactus />} />
          <Route path="/term" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/shipping" element={<Shipping />} />
          
       </Routes>

    </>
  )
}
export default App

