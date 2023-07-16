import { ReactNode } from "react";

import styles from './styles.module.scss'

type Props = {
    children: ReactNode;
}

export const Aligner = ({children}: Props) => {
    return (
    <div className={styles.aligner}>
        {children}
    </div>
    )
}