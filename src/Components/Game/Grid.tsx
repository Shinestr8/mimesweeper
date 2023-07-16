import { useEffect, useMemo, useState } from "react";
import { Cell } from "./Cell/Cell";
import { arraysEqual, getRandomInt, hasArray } from "../../utils/numberUtils";

type Props = {
  sizeX: number;
  sizeY: number;
  bombCount: number;
};

type Position = [number, number];

export const Grid = ({ sizeX, sizeY, bombCount }: Props) => {
  const [cleared, setCleared] = useState<Array<Position>>([]);
  const [start, setStart] = useState<{
    initialized: boolean;
    firstPos: Position | null;
  }>({ initialized: false, firstPos: null });
  const [loss, setLoss] = useState(false);

  const bombPos = useMemo(() => {
    const arr: number[] = [];
    const { initialized, firstPos } = start;
    if (!initialized || !firstPos) return arr;
    for (let i = 0; i < bombCount; ++i) {
      let newBombPos = getRandomInt(0, sizeX * sizeY);
      while (
        newBombPos === firstPos[1] * sizeX + firstPos[0] ||
        arr.includes(newBombPos)
      ) {
        newBombPos = getRandomInt(0, sizeX * sizeY);
      }
      arr.push(newBombPos);
    }
    return arr;
  }, [bombCount, start]);

  useEffect(() => {
    start.firstPos && propagateClick(start.firstPos);
  }, [bombPos]);

  const playground: Array<{ position: Position; hasBomb: boolean }> = [];

  let index = 0;
  for (let i = 0; i < sizeY; ++i) {
    for (let j = 0; j < sizeX; j++) {
      const hasBomb = bombPos.includes(index);
      playground.push({ position: [j, i], hasBomb });
      index++;
    }
  }

  const getHasBombByPos = (position: [number, number]) => {
    const cell = playground.find((c) => arraysEqual(c.position, position));
    return cell?.hasBomb;
  };

  const isValidCoordinate = (position: [number, number]) => {
    const [x, y] = position;
    return x >= 0 && x < sizeX && y >= 0 && y < sizeY;
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
    ];
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
    ];
    const validNeighbours = neighbours.filter((pos) => {
      return isValidCoordinate(pos);
    });
    return validNeighbours;
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

  const propagateClick = (pos: [number, number]) => {
    let cellsToCheck = [pos]
    const newCleared: Array<Position> = [...cleared];
    const checked: Array<Position> = [];
    let guard = 0
    while(cellsToCheck.length !== 0 || guard > sizeX * sizeY){
      const newCellsToCheck: Array<Position> = []
      cellsToCheck.forEach((cell) => {

        newCleared.push(cell)
        const cellNumber = getNeighBourBombs(cell)
        if(cellNumber !== 0){
          cellsToCheck = []
          return;
        }
        const cellNeighbours = getNeighbourCells(cell)
        cellNeighbours.forEach((neighbour) => {
          newCleared.push(neighbour)
          !hasArray(newCellsToCheck, neighbour) && !hasArray(checked, neighbour) && newCellsToCheck.push(neighbour)
        })

        checked.push(cell)
      })
      cellsToCheck = newCellsToCheck
      guard++
    }
    

    setCleared(newCleared);
  }

  const handleCellClick = (pos: [number, number], hasBomb: boolean) => {
    if(hasBomb) {
      setLoss(true)
    }
    if (!start.initialized) {
      setStart({ initialized: true, firstPos: pos });
    } else {
      !hasBomb && propagateClick(pos);
    }
  };

  return (
    <div
      className="grid"
      style={{ gridTemplateColumns: `repeat(${sizeX}, 1fr)` }}
    >
      {playground.map((cell) => {
        return (
          <Cell
            position={cell.position}
            hasBomb={cell.hasBomb}
            number={getNeighBourBombs(cell.position)}
            handleCellClickCallback={handleCellClick}
            isCleared={loss || hasArray(cleared, cell.position)}
          />
        );
      })}
    </div>
  );
};
