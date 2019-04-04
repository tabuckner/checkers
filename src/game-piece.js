import { CELL_VALUES_ENUM } from "./constants/cell-values.enum";
import { BOARD_SIZE } from "./constants/board-size";

export default class GamePiece {
  /**
   * @param {number} xPos x coordinate
   * @param {number} yPos y coordinate
   * @param {string} color CELL_VALUES_ENUM
   */
  constructor(xPos, yPos, color, boardSize = BOARD_SIZE) {
    this._boardSize = boardSize;
    this.xPos = this.checkCoordinateBoundary(xPos);
    this.yPos = this.checkCoordinateBoundary(yPos);
    this.color = this._checkColorParam(color);
  }

  _checkColorParam(colorParam) {
    if (Object.values(CELL_VALUES_ENUM).indexOf(colorParam) < 0) {
      throw new Error('Color param provided is invalid. Must be `white` or `black`');
    }
    return colorParam;
  }

  checkCoordinateBoundary(coordinate) {
    if (coordinate > this._boardSize || coordinate < 0) {
      throw new Error('Coordinate exceeds grid boundaries.');
    }
    return coordinate;
  }
};