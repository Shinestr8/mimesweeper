export const getNeighbourCells = (position: [number, number], sizeX: number, sizeY: number) => {
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
      return isValidCoordinate(pos, sizeX, sizeY);
    });
  };

  export const isValidCoordinate = (position: [number, number], sizeX: number, sizeY: number) => {
    const [x, y] = position;
    return x >= 0 && x < sizeX && y >= 0 && y < sizeY;
  };

  export const numberToCoord = (index: number, size: number) => {
    return [index % size, Math.floor(index/size)]
  }