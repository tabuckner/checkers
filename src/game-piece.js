import { COLORS_ENUM } from "./constants/colors.enum";

export default class GamePiece {
  /**
   * 
   * @param {number} xPos 
   * @param {number} yPos 
   * @param {string} color COLORS_ENUM
   */
  constructor(xPos, yPos, color) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.color = this.checkColorParam(color);
  }

  checkColorParam(colorParam) {
    if (Object.values(COLORS_ENUM).indexOf(colorParam) < 0) {
      throw new Error('Color param provided is invalid. Must be `white` or `black`');
    }
    return colorParam;
  }
};