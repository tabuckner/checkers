import GamePiece from "./game-piece";
import { COLORS_ENUM } from "./constants/colors.enum";

/**
 * **PROMPT**
 * 
 * - Write a function or method (depending on how you decide to write the program),
 * that given a checkers board and a position on the board, returns the following:
 * 
 * 1. If no piece is at the position provided, returns an empty array.
 * 2. If the piece at the position has no jumps it can make, it returns an empty array.
 * 3. If there are any opposite-colored pieces it can jump from its position,
 *   the array should contain arrays with the following structure:
 *   [position it can jump, position it will land on if it jumps a piece]
 * 
 * [NOTES]
 * - A checkers board (10x10 squares) should be represented somehow in the code,
 * along with the positions of the white and black pieces.
 * 
 * - The positions on the board should be representable in the code, i.e.,
 * you should be able to assign any position on the board to a variable.
 * 
 * [Assumptions]
 * - All pieces are in their first directional paths, (e.g. have not reached the opponents edge yet).
 * - We do not need to handle the 'kinging' mechanic.
 * 
 */

export default class CheckersChecker {
  gamePieces = [];

  constructor() {
    const newGamePiece = new GamePiece(1, 1, COLORS_ENUM.white);
    this.gamePieces.push(newGamePiece);
  }
};