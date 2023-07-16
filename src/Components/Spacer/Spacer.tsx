type Props = {
    margin: number;
}
export const Spacer = ({margin}: Props) => {
    return (
        <div style={{margin: `${margin}px`}}/>
    )
}