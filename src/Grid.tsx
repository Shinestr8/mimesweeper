import { useEffect, useMemo, useState } from "react";
import { Cell } from "./Cell";
import { arraysEqual, getRandomInt, hasArray } from "./utils/numberUtils";

type Props = {
  size: number;
  bombCount: number;
};

type Position = [number, number];

export const Grid = ({ size, bombCount }: Props) => {
  const [cleared, setCleared] = useState<Array<Position>>([]);
  const [start, setStart] = useState<{
    initialized: boolean;
    firstPos: Position | null;
  }>({ initialized: false, firstPos: null });

  const bombPos = useMemo(() => {
    const arr: number[] = [];
    const { initialized, firstPos } = start;
    if (!initialized || !firstPos) return arr;
    for (let i = 0; i < bombCount; ++i) {
      let newBombPos = getRandomInt(0, size ** 2);
      while (
        newBombPos === firstPos[0]*size + firstPos[1] ||
        arr.includes(newBombPos)
      ) {
        newBombPos = getRandomInt(0, size ** 2);
      }
      arr.push(newBombPos);
    }
    return arr;
  }, [size, bombCount, start]);

  useEffect(() => {
    start.firstPos && propagateClick(start.firstPos, false);
  }, [bombPos]);

  const playground: Array<{position: Position, hasBomb: boolean}>  = [];

  let index = 0;
  for (let i = 0; i < size; ++i) {
    for (let j = 0; j < size; j++) {
      const hasBomb = bombPos.includes(index);
      playground.push({ position: [i, j], hasBomb });
      index++;
    }
  }

  const getHasBombByPos = (position: [number, number]) => {
    const cell = playground.find((c) => arraysEqual(c.position, position));
    return cell?.hasBomb;
  };

  const isValidCoordinate = (position: [number, number]) => {
    const [x, y] = position;
    return x >= 0 && x < size && y >= 0 && y < size;
  };

  const getNeighbourCells = (position: [number, number]) => {
    const [x, y] = position;
    const neighbours: Array<[number, number]> = [
      [x - 1, y + 1],
      [x, y + 1],
      [x + 1, y + 1],
      [x - 1, y],
      [x + 1, y],
      [x - 1, y - 1],
      [x, y - 1],
      [x + 1, y - 1],
    ]
    return neighbours.filter((pos) => {
      return isValidCoordinate(pos);
    });
  };

  const getDirectNeighbours = (position: [number, number]) => {
    const [x, y] = position;
    const neighbours: Array<[number, number]> = [
      [x, y + 1],
      [x - 1, y],
      [x + 1, y],
      [x, y - 1],
    ]
    return neighbours.filter((pos) => {
      return isValidCoordinate(pos)
    });
  };

  const getNeighBourBombs = (position: [number, number]) => {
    const neighbours = getNeighbourCells(position);
    let neighbourBombs = 0;

    neighbours.forEach((n) => {
      const hasBomb = getHasBombByPos(n);
      hasBomb && neighbourBombs++;
    });

    return neighbourBombs;
  };

  const propagateClick = (pos: [number, number], hasBomb: boolean) => {
    let neighbours = getDirectNeighbours(pos);
    const newCleared: Array<Position> = [...cleared];
    const checked = [pos];
    if (!hasBomb) {
      newCleared.push(pos);
    }

    while (neighbours.length !== 0) {
      let newNeighbours: Array<Position> = [];
      neighbours.forEach((n) => {
        checked.push(n);
        if (getNeighBourBombs(n) === 0 && !getHasBombByPos(n)) {
          newCleared.push(n);
          newNeighbours = [
            ...newNeighbours,
            ...getDirectNeighbours(n).filter(
              (c) =>
                !hasArray(newNeighbours, c) &&
                !hasArray(checked, c) &&
                !hasArray(neighbours, c)
            ),
          ];
        }
      });

      neighbours = [...newNeighbours];
    }

    setCleared(newCleared);
  };

  const handleCellClick = (pos: [number, number], hasBomb: boolean) => {
    if (!start.initialized) {
      setStart({ initialized: true, firstPos: pos });
    } else {
      propagateClick(pos, hasBomb);
    }
  };

  return (
    <div className="grid">
      {playground.map((cell) => {
        return (
          <Cell
            position={cell.position}
            hasBomb={cell.hasBomb}
            number={getNeighBourBombs(cell.position)}
            handleCellClickCallback={handleCellClick}
            isCleared={hasArray(cleared, cell.position)}
          />
        );
      })}
    </div>
  );
};
