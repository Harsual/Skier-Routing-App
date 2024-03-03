import React, {useEffect, useState} from 'react'
import './App.css'


function App() {
  
  const [backendData, setBackendData] = useState([{}])
  
  useEffect(() => {
	  fetch("/api").then(
	  response => response.json()
	  ).then(
		  data => {
			  setBackendData(data)
		  }
	  )
  },[])
  
  return (
    <div>
      <div className="container">
        
        <header>Weclome to the Ski-resort App</header>
        
        <div className='image-container'>
          <img src="Map.jpeg" className= "image" alt="Example" />
        </div>
  
        
        <div>
        <button className='large-button'>Find Path</button>
        <button className='large-button'>Find Facility </button>
        <button className='large-button'>Use lift to move up</button>
        </div> 
        </div>
    </div>
  )
}

export default App
