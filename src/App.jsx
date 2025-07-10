import { useState } from 'react'
import './App.css'
import CustomNavbar from './components/CustomNavbar'
import Home from './Pages/Home'
function App() {
  const [count, setCount] = useState(0)
  return (
    <>  
        <CustomNavbar />
       <Home />

    </>
  )
}
export default App
