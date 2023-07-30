import { useEffect, useState } from "react";
import { formatSeconds } from "../../../utils/formatSeconds";

type Props = {
    timeCallback: (time: number) => void
}

export const Timer = ({timeCallback}: Props) => {

    const [time, setTime] = useState<number>(0)

    useEffect(() => {
        const interval = setInterval(() => increment(), 1000);
    
        return () => clearInterval(interval);
      }, []);

    const increment = () => {
        setTime((t) => {
            timeCallback(t+1)
            return t+1
        })
      };
    
    

    return <div>{formatSeconds(time)}</div>
}