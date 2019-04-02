import { COLORS_ENUM } from "./constants/colors.enum";
import { BOARD_SIZE } from "./constants/board-size";

export default class GamePiece {
  /**
   * @param {number} xPos 
   * @param {number} yPos 
   * @param {string} color COLORS_ENUM
   */
  constructor(xPos, yPos, color, boardSize = BOARD_SIZE) {
    this.xPos = this.checkCoordinateBoundary(xPos);
    this.yPos = this.checkCoordinateBoundary(yPos);
    this.color = this.checkColorParam(color);
    this._boardSize = boardSize;
  }

  checkColorParam(colorParam) {
    if (Object.values(COLORS_ENUM).indexOf(colorParam) < 0) {
      throw new Error('Color param provided is invalid. Must be `white` or `black`');
    }
    return colorParam;
  }

  checkCoordinateBoundary(coordinate) {
    if (coordinate > this._boardSize) {
      throw new Error('Coordinate exceeds grid boundaries.');
    }
    return coordinate;
  }
};