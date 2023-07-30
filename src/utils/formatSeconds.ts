export const formatSeconds = (time: number) => {
    //@ts-expect-error empty date
    const date = new Date(null);
    date.setSeconds(time);     
    return date.toISOString().slice(11, 19);
}
