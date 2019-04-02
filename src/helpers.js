import { COLORS_ENUM } from "./constants/colors.enum";

export default class Helpers {
  static getIsPlayablePosition(currentValue) {
    if (currentValue === COLORS_ENUM.locked) {
      throw new Error('Cannot place a GamePiece at this position');
    }
    return true;
  }
}