import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Grid } from './Grid'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='wrapper'>
      <Grid size={10} bombCount={20}/>
    </div>
  )
}

export default App
