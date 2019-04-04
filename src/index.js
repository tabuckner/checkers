import CheckersChecker from "./checkers-checker";
import GamePiece from "./game-piece";
import GameBoard from "./game-board";
import { CELL_VALUES_ENUM } from "./constants/cell-values.enum";

/** Quick POC of Implementation */
const myGamePieces = [];
const opponentPiecePositions = [[0, 0], [0, 2], [2, 0], [2, 2]];
opponentPiecePositions.map((o) => {
  const opponentPiece = new GamePiece(o[0], o[1], CELL_VALUES_ENUM.white);
  myGamePieces.push(opponentPiece);
});
const playerPosition = [1,1]
const playerPiece = new GamePiece(playerPosition[0], playerPosition[1], CELL_VALUES_ENUM.black);
myGamePieces.push(playerPiece);
const myGameBoard = new GameBoard(myGamePieces);

console.log(new CheckersChecker().getValidJumps(myGameBoard, [1, 1], 4));