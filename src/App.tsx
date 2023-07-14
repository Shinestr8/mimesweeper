import { useState } from 'react'
import './App.css'
import { Grid } from './Grid'
import { GameSetting, GameSetup } from './GameSetup'

function App() {
  const [gameSettings, setGameSettings] = useState<GameSetting | null>(null)
  
  return (
    <>
    {!gameSettings ? <GameSetup setGameSettings={setGameSettings}/> : (
      <div className='wrapper'>
      <Grid sizeX={gameSettings.row} sizeY={gameSettings.column} bombCount={gameSettings.bomb}/>
    </div>
    )}
    
    </>
    
  )
}

export default App
