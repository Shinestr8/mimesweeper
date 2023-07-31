import { useEffect, useState } from "react";
import { formatSeconds } from "../../../utils/formatSeconds";

type Props = {
    timeCallback: (v: any) => any
    className?: string
    stopTimer: boolean
    time: number
}

export const Timer = ({timeCallback, className, stopTimer, time}: Props) => {
    useEffect(() => {
        const interval = setInterval(() => increment(), 1000);
        if(stopTimer) clearInterval(interval)
        return () => clearInterval(interval);
      }, [stopTimer]);

    const increment = () => {
        if(stopTimer) return
        timeCallback((t: number) => t+1)
      };
    
    

    return <div className={className}>{formatSeconds(time)}</div>
}