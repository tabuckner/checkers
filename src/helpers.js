import { CELL_VALUES_ENUM } from "./constants/cell-values.enum";

export default class Helpers {
  /**
   * Given a position's value, will return if that position is a playable cell.
   * @param {number} positionValue the value at a given [x,y] position
   */
  static isPlayablePosition(positionValue) {
    if (positionValue === CELL_VALUES_ENUM.locked) {
      throw new Error('Cannot place a GamePiece at this position');
    }
    return true;
  }

  /**
   * Given a position's value, will return if that position is 'empty'.
   * @param {number} positionValue the value at a give [x,y] position
   */
  static isPositionEmpty(positionValue) {
    return positionValue === CELL_VALUES_ENUM.empty;
  }

  /**
   * Given an [x,y] pair and a board size, returns if the coords are out of bounds.
   * @param {Array<number>} position [x,y] coords
   * @param {number} boardSize size of the board
   */
  static isPositionOutOfBounds(position, boardSize) {
    for (let coord of position) {
      if (coord > boardSize || coord < 0) {
        return true;
      }
    }
    return false;
  }

  /**
   * Given a board and point, returns the value at that coordinate.
   * @param {GameBoard} board 
   * @param {Array<number>} point [x,y] coords
   */
  static getPointValue(board, point) {
    return board[point[0]][point[1]];
  }
}