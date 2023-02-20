const generateNumbers = (dimension: number) => {
  return Array.from(Array(dimension ** 2 / 2).keys()).map((n) => n + 1);
};

const convertTo2DArray = (array: number[], dimension: number) => {
  const grid = [];
  for (let i = 0; i < dimension; i++) {
    grid.push(array.splice(0, dimension));
  }
  return grid;
};

/**
 *
 * @param dimension The size of the grid. Must be even.
 *
 */
const generateGame = (dimension: number = 4) => {
  if (dimension % 2 !== 0) throw new Error("Grid size must be even");
  const matrix = [];
  const randomNumbers = generateNumbers(dimension);
  const totalNumbers = randomNumbers.concat(randomNumbers);
  const length = totalNumbers.length;
  for (let i = 0; i < length; i++) {
    matrix.push(
      ...totalNumbers.splice(Math.floor(Math.random() * totalNumbers.length), 1)
    );
  }
  const grid = convertTo2DArray(matrix, dimension);
  return { grid, dimension };
};

export default generateGame;
