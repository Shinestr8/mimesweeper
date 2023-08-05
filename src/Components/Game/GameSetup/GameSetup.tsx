import { useState } from "react"
import { DifficultyPicker } from "../DifficultyPicker/DifficultyPicker"

import styles from './styles.module.scss'
import { Button } from "../../Button/Button";
import { Spacer } from "../../Spacer/Spacer";

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

    const [selected, setSelected] = useState(0)
    const presets = [
        {name: "Easy", row: 8, column: 8, bomb: 10},
        {name: "Medium", row: 16, column: 16, bomb: 40},
        {name: "Hard", row: 30, column: 16, bomb: 100},
    ]

    const handleSubmit = () => {
        setGameSettings(presets[selected])
    }

    return (
        <div className={styles.wrapper}>
            <div>
            {presets.map(({name}, index) => {
               return  <DifficultyPicker key={`difficulty-${index}-${name}`}label={name} isActive={selected === index} onClick={() => setSelected(index)} />
            })}
            </div>
            <Spacer margin={8} />
            <Button label="Start" onClick={handleSubmit} />
        </div>
    )
}