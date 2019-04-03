import { COLORS_ENUM } from "./constants/colors.enum";

export default class Helpers {
  /**
   * Given a position's value, will return if that position is a playable cell.
   * @param {number} positionValue the value at a given [x,y] position
   */
  static isPlayablePosition(positionValue) {
    if (positionValue === COLORS_ENUM.locked) {
      throw new Error('Cannot place a GamePiece at this position');
    }
    return true;
  }

  /**
   * Given a position's value, will return if that position is 'empty'.
   * @param {number} positionValue the value at a give [x,y] position
   */
  static isPositionEmpty(positionValue) {
    return positionValue === COLORS_ENUM.empty;
  }
}