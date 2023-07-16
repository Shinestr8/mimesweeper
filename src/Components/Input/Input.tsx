import { InputHTMLAttributes } from 'react';
import styles from './styles.module.scss'

type Props = {
    label?: string;
    name: string;
    onChange?: (value: any) => void;
} & InputHTMLAttributes<HTMLInputElement>

export const Input = ({label, name, type, onChange}: Props) => {

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value)
    }

    return (
        <div className={styles.inputWrapper}>
        <label htmlFor={name}>
            {label}
        </label>
        <input id={name} type={type} onChange={handleInputChange} />
        </div>
    )
}