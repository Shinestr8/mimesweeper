import styles from './styles.module.scss';

type Props = {
    position: [number, number]
    hasBomb: boolean
    number: number
    handleCellClickCallback: (pos: any, hasBomb: boolean) => void
    isCleared: boolean
}

export const Cell = ({position, hasBomb, number, handleCellClickCallback, isCleared}: Props) => {
    
    const handleCellClick = () => {
        handleCellClickCallback(position, hasBomb)
    }
    
    let cellClassName = ''
    if(isCleared){
        cellClassName = hasBomb ? styles.cell__bomb : styles?.[`cell__${number}`]
    } 

    return <div className={`${styles.cell} ${isCleared ? styles.cell__cleared : ''}`} onClick={handleCellClick}>
        <div className={cellClassName}>
            {isCleared ? (hasBomb ? 'x' : number) : '' }
        </div>
    </div>
}




