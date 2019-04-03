import GamePiece from "./game-piece";
import GameBoard from "./game-board";
import { COLORS_ENUM } from "./constants/colors.enum";
import Helpers from "./helpers";
import { BOARD_SIZE } from "./constants/board-size";

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
 * - Prompt seems to indicate a single turn.
 * 
 */

export default class CheckersChecker {
  _boardSize = BOARD_SIZE;
  /** @type {Array<GamePiece>} */
  gamePieces = [];
  /** @type {GameBoard} */
  gameBoard;

  constructor() {
    const newGamePiece = new GamePiece(1, 1, COLORS_ENUM.white, this._boardSize);
    this.gamePieces.push(newGamePiece);
    this.gameBoard = new GameBoard( this.gamePieces, this._boardSize);
  }

  /**
   * Given a board of type GameBoard, and a position (x,y), returns a multidimensional
   * array of valid moves that may be chained together.
   * @param {Array<Array<number>>} board return value of GameBoard constructor.
   * @param {Array<number>} position - [x, y].
   */
  getValidJumps(board, position) {
    if (!board || !position) {
      throw new Error('Board and Position must be provided.')
    }
    const returnArray = [];
    const xPos = position[0];
    const yPos = position[1];
    const pointValue = board[xPos][yPos];
    if (!Helpers.isPlayablePosition(pointValue)) {
      return;
    }
    if (pointValue === 0) {
      return returnArray;
    }
    const potentialCells = this._getPotentialCells(board, position);
    const adjacentOpponentCells = this._filterOpponentCells(potentialCells, pointValue, board);
    if (adjacentOpponentCells.length === 0) {
      return returnArray;
    }

    for (let adjacentOpponentCell of adjacentOpponentCells) {
      console.log(adjacentOpponentCell);
      const optionArray = [];
      // get postJumpPosition coordinates
      const opponentXPos = adjacentOpponentCell[0];
      const opponentYPos = adjacentOpponentCell[1];
      const postJumpXPos = ((opponentXPos - xPos) * 2) + xPos;
      const postJumpyPos = ((opponentYPos - yPos) * 2) + yPos;
      const postJumpCoords = [postJumpXPos, postJumpyPos];
      const postJumpIsOutOfBounds = Helpers.isPositionOutOfBounds(postJumpCoords, this._boardSize);
      console.log({postJumpIsOutOfBounds, postJumpCoords})

      // if the postJumpPosition is out of bounds do nothing
      if (!postJumpIsOutOfBounds) {
        // push opponentCell onto optionArray
        optionArray.push(adjacentOpponentCell);
        console.log({optionArray});
        // push it onto the options array
        optionArray.push(postJumpCoords);
        console.log({optionArray});
        // push onto return array
        returnArray.push(optionArray);
      }
    }
    console.log(returnArray)
    return returnArray;
  }

  /**
   * Given a 2d array of coordinates for cells potentially containing an opponent piece,
   * returns 2d array of coordinates for cells absolutely containing an opponent piece.
   * @param {Array<Array<number>>} potentialCells nested array of potential cells
   * @param {number} playerValue the current player's value
   * 
   * NOTE: potentialCells is assumed to only contain playable positions.
   */
  _filterOpponentCells(potentialCells, playerValue, board) {
    return potentialCells.filter((cell) => {
      const xPos = cell[0];
      const yPos = cell[1];
      // console.log({cell, board});
      const targetValue = board[xPos][yPos];

      if (targetValue !== playerValue && !Helpers.isPositionEmpty(targetValue)) {
        return true;
      }
      return false;
    });
  }

  /**
   * Given a board of type GameBoard and a position [x,y], returns an array of [x,y] pairs to be considered.
   * @param {Array<Array<number>>} board return value of GameBoard constructor
   * @param {Array<number>} position [x, y]
   */
  _getPotentialCells(board, position) {
    const potentialCells = [];
    const xPos = position[0];
    const yPos = position[1];

    const posModulations = [
      [-1, -1],
      [1, -1],
      [1, 1],
      [-1, 1]
    ];

    posModulations.map((modulation) => {
      const xModulation = modulation[0];
      const yModulation = modulation[1];
      const targetXPos = xPos + xModulation;
      const targetYPos = yPos + yModulation;

      if (targetXPos > -1 && targetYPos > -1) {
        const targetValue = board[targetXPos][targetYPos];

        if (Helpers.isPlayablePosition(targetValue)) {
          potentialCells.push([targetXPos, targetYPos])
        }
      }
    });
    console.warn(potentialCells);
    return potentialCells;
  }

};