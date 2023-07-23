import { useState } from "react"
import { DifficultyPicker } from "./DifficultyPicker"
import { Input } from "../Input/Input";
import { Aligner } from "../Aligner/Aligner";
import { Spacer } from "../Spacer/Spacer";


export type GameSetting = {
    name: string;
    row?: number;
    column?: number;
    bomb?: number;
}

type Props = {
    setGameSettings: (val: GameSetting) => void
}

export const GameSetup = ({setGameSettings}: Props) => {

    const [selected, setSelected] = useState(0)
    const [customPreset, setCustomPreset] = useState<GameSetting | null>(null)
    const presets = [
        {name: "Easy", row: 8, column: 8, bomb: 10},
        {name: "Medium", row: 16, column: 16, bomb: 40},
        {name: "Hard", row: 30, column: 16, bomb: 100},
        {name: "Custom"}
    ]

    const handleSubmit = () => {
        setGameSettings(presets[selected])
    }

    return (
        <div>
            {presets.map(({name}, index) => {
               return  <DifficultyPicker label={name} isActive={selected === index} onClick={() => setSelected(index)} />
            })}
            {selected === presets.length - 1 && (
                <Aligner>
                    <Input name="column" label="Column" type="number" />
                    <Spacer margin={4} />
                    <Input name="row" label="Row" type="number" />
                    <Spacer margin={4} />
                    <Input name="bomb" label="Bomb" type="number" />
                </Aligner>
                
            )}
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}