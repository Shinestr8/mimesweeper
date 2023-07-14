type Props = {
    label: string;
    isActive: boolean;
    onClick: () => void
}

export const DifficultyPicker = ({label, onClick, isActive}: Props) => {
    return <button onClick={onClick} className={`difficultyPicker ${isActive ? "active" : ''}`}>
        {label}
    </button>
}