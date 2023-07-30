import { ButtonHTMLAttributes, ReactNode } from "react"

import styles from './styles.module.scss'

type Props = {
    label: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({label, ...rest}: Props) => {
    return (<button className={styles.btn} {...rest}>{label}</button>)
}