import { useState } from 'react'
import './App.scss'
import { Grid } from './Components/Game/Grid/Grid'
import { GameSetting, GameSetup } from './Components/Game/GameSetup/GameSetup'

// const defaultOpt = {name: "Hard", row: 10, column: 10, bomb: 5}

function App() {
  const [gameSettings, setGameSettings] = useState<GameSetting | null>()
  
  return (
    <>
    {!gameSettings ? <GameSetup setGameSettings={setGameSettings}/> : (
      <Grid sizeX={gameSettings.row} sizeY={gameSettings.column} bombCount={gameSettings.bomb}/>
    )}
    
    </>
    
  )
}

export default App
