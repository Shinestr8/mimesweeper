import { formatSeconds } from '../../utils/formatSeconds'
import { Button } from '../Button/Button'
import { Spacer } from '../Spacer/Spacer'
import styles from './styles.module.scss'

type Props = {
    handleReplay: () => void
    time: number
}

export const Win = ({handleReplay, time}: Props) => {
    return <div className={styles.win}>
        <div>WINNER !!!!!!!!! you finished in {formatSeconds(time)} (pog)</div>
        <Spacer margin={20} />
        <Button label="Play again" onClick={handleReplay} />
        </div>
}