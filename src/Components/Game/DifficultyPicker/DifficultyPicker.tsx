import styles from './styles.module.scss'

type Props = {
    label: string;
    isActive: boolean;
    onClick: () => void
}

export const DifficultyPicker = ({label, onClick, isActive}: Props) => {
    return <button onClick={onClick} className={`${styles.difficultyPicker} ${isActive ? styles.difficultyPicker_active : ''}`}>
        {label}
    </button>
}