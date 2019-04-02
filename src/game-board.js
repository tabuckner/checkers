import GamePiece from "./game-piece";
import { COLORS_ENUM } from "./constants/colors.enum";
import { BOARD_SIZE } from "./constants/board-size";
import Helpers from "./helpers";

export default class GameBoard {
  /** @type {Array<Array>} */
  board = [];
  /**
   * @param {number} boardSize one dimensional size of grid
   * @param {Array<GamePiece>} gamePieces array of GamePiece
   */
  constructor(boardSize = BOARD_SIZE, gamePieces = [], board = []) {
    this._initializeBoard(boardSize, board);
    this._populateBoard(gamePieces);
    return this.board;
  }

  _populateBoard(gamePieces) {
    for (let piece of gamePieces) {
      const currentValue = this.board[piece.yPos][piece.xPos];
      if (this._getIsValidCell(currentValue)) {
        currentValue = piece.color;
      }
    }
  }


  _initializeBoard(boardSize, board) {
    this.board = board;
    for (let i = 0; i < boardSize; i++) {
      const newRow = [];
      const reverse = i % 2 == 0 ? true : false;
      for (let j = 0; j < boardSize; j++) {
        const pushVal = j % 2 !== 0 ? COLORS_ENUM.empty : COLORS_ENUM.locked;
        newRow.push(pushVal);
      }
      if (reverse) {
        newRow = newRow.reverse();
      }
      this.board.push(newRow);
    }
    console.log(this.board);
  }

  _getIsValidCell(currentValue) {
    return Helpers.getIsPlayablePosition(currentValue);
  }
};