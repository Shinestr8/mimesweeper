import styles from "./styles.module.scss";

type Props = {
  position: [number, number];
  hasBomb: boolean;
  number: number;
  handleCellClickCallback: (pos: any, hasBomb: boolean, hasFlag: boolean) => void;
  handleRightClickCallback: (pos: any, hasFlag: boolean, isCleared: boolean) => void;
  isCleared: boolean;
  hasFlag: boolean;
};

export const Cell = ({
  position,
  hasBomb,
  number,
  handleCellClickCallback,
  handleRightClickCallback,
  isCleared,
  hasFlag,
}: Props) => {
  const handleCellClick = () => {
    handleCellClickCallback(position, hasBomb, hasFlag);
  };

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    handleRightClickCallback(position, hasFlag, isCleared);
  };

  let cellClassName = "";
  if (isCleared) {
    cellClassName = hasBomb ? styles.cell__bomb : styles?.[`cell__${number}`];
  }

  return (
    <div
      className={`${styles.cell} ${
        isCleared || hasFlag ? styles.cell__cleared : ""
      }`}
      onClick={handleCellClick}
      onContextMenu={handleRightClick}
    >
      {hasFlag ? (
        <div>F</div>
      ) : (
        <div className={cellClassName}>
          {isCleared ? (hasBomb ? "x" : number) : ""}
        </div>
      )}
    </div>
  );
};
