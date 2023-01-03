import { useState } from 'react'
import Weather from './Components/Weather'
import './Style.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Weather/>
    </div>
  )
}

export default App
