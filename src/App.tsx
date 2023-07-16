import { useState } from 'react'
import './App.scss'
import { Grid } from './Components/Game/Grid'
import { GameSetting, GameSetup } from './Components/Game/GameSetup'

const defaultOpt = {name: "Hard", row: 20, column: 20, bomb: 100}

function App() {
  const [gameSettings, setGameSettings] = useState<GameSetting | null>(defaultOpt)
  
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
