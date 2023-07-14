import { useState } from "react"
import { DifficultyPicker } from "./DifficultyPicker"


export type GameSetting = {
    name: string;
    row: number;
    column: number;
    bomb: number;
}

type Props = {
    setGameSettings: (val: GameSetting) => void
}

export const GameSetup = ({setGameSettings}: Props) => {

    const [selected, setSelected] = useState(2)
    const presets = [
        {name: "Easy", row: 8, column: 8, bomb: 10},
        {name: "Medium", row: 16, column: 16, bomb: 40},
        {name: "Hard", row: 30, column: 16, bomb: 100},
    ]

    const handleSubmit = () => {
        setGameSettings(presets[selected])
    }

    return (
        <div>
            {presets.map(({name}, index) => {
               return  <DifficultyPicker label={name} isActive={selected === index} onClick={() => setSelected(index)} />
            })}
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}