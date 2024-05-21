import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Router from "./routes/Router"; 

function App() {

  return (
    <>
    <div className="App">
      <Router />    
    </div>

    </>
  )
}

export default App
