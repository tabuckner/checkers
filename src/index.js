import GamePiece from "./game-piece";
import GameBoard from "./game-board";
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
  /** @type {GameBoard} */
  _gameBoard;

  constructor() {}

  /**
   * Given a board of type GameBoard, and a position (x,y), returns a multidimensional
   * array of valid moves that may be chained together.
   * @param {Array<Array<number>>} board return value of GameBoard constructor.
   * @param {Array<number>} position - [x,y]. // TODO: Use `Set` instead of array for O(1) time comp.
   */
  getValidJumps(board, position) {
    if (!board || !position) {
      throw new Error('Board and Position must be provided.')
    }
    const returnArray = [];
    const pointValue = Helpers.getPointValue(board, position); // TODO: Change helpers to accept position.

    if (!Helpers.isPlayablePosition(pointValue)) {
      return;
    }

    if (Helpers.isPositionEmpty(pointValue)) {
      return returnArray;
    }

    const adjacentOpponentCells = this._getAdjacentOpponentCells(board, position);
    if (adjacentOpponentCells.length === 0) {
      return returnArray;
    }

    this._populateJumpOptions(adjacentOpponentCells, position, returnArray);
    console.log(returnArray)
    return returnArray;
  }

  /**
   * Given an array of adjacentOpponentCells, a player's position, and an empty array,
   * will populate the empty array with options of 'jumps' in the following signature:
   * 
   * [ [[opponentX,opponentY], [postJumpX,postJumpY]], ... ]
   * 
   * @param {Array<Array<number>>} adjacentOpponentCells 2d array of coordinates of adjacent opponents
   * @param {Array<number>} playerCoords player's coordinates [x,y]
   * @param {Array<undefined>} returnArray empty array to be populated.
   */
  _populateJumpOptions(adjacentOpponentCells, playerCoords, returnArray) {

    for (let adjacentOpponentCell of adjacentOpponentCells) {
      const optionArray = [];
      // get postJumpPosition coordinates
      const postJumpCoords = this._getPostJumpCoordinates(playerCoords, adjacentOpponentCell);
      // if the postJumpPosition is out of bounds do nothing
      const postJumpIsOutOfBounds = Helpers.isPositionOutOfBounds(postJumpCoords, this._boardSize);
      if (!postJumpIsOutOfBounds) {
        // push opponentCell onto optionArray
        optionArray.push(adjacentOpponentCell);
        // push it onto the options array
        optionArray.push(postJumpCoords);
        // push onto return array
        returnArray.push(optionArray);
      }
    }
  }

  /**
   * Given a player position, and opponent position, will return `post-jump` coordinates.
   * @param {Array<number>} playerPosition players [x,y] coordinates
   * @param {Array<number>} opponentPosition players [x,y] coordinates
   */
  _getPostJumpCoordinates(playerPosition, opponentPosition) {
    const jumpOver = (p, o) => ((o - p) * 2) + p;
    const playerXPos = playerPosition[0];
    const playerYPos = playerPosition[1];
    const opponentXPos = opponentPosition[0];
    const opponentYPos = opponentPosition[1];
    const postJumpXPos = jumpOver(playerXPos, opponentXPos);
    const postJumpYPos = jumpOver(playerYPos, opponentYPos);
    const postJumpCoords = [postJumpXPos, postJumpYPos];
    return postJumpCoords;
  }

  /**
   * Given a GameBoard and position, returns 2d array of coordinates for cells
   * containing an opponent piece.
   * @param {GameBoard} board 
   * @param {Array<number>} position [x,y] coords
   */
  _getAdjacentOpponentCells(board, position) {
    const pointValue = Helpers.getPointValue(board, position);
    const potentialCells = this._getPotentialCells(board, position);
    return this._filterOpponentCells(potentialCells, pointValue, board);
  }

  /**
   * Given a 2d array of coordinates for cells potentially containing an opponent piece,
   * returns 2d array of coordinates for cells absolutely containing an opponent piece.
   * @param {Array<Array<number>>} potentialCells nested array of potential cells
   * @param {number} playerValue the current player's value
   * @param {GameBoard} board the game board
   * 
   * NOTE: potentialCells is assumed to only contain playable positions.
   */
  _filterOpponentCells(potentialCells, playerValue, board) {
    return potentialCells.filter((cell) => {
      const xPos = cell[0];
      const yPos = cell[1];
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
    return potentialCells;
  }

};