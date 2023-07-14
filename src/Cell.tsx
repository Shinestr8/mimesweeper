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
    
    return <div className="cell" style={{background: hasBomb ? 'red' : isCleared ? 'blue' : 'white'}} onClick={handleCellClick}>{hasBomb ? 'x' : number    } 
    <div>
        {JSON.stringify(position)}
    </div></div>
}




