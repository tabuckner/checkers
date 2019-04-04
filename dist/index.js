"use strict";

var _checkersChecker = _interopRequireDefault(require("./checkers-checker"));

var _gamePiece = _interopRequireDefault(require("./game-piece"));

var _gameBoard = _interopRequireDefault(require("./game-board"));

var _cellValues = require("./constants/cell-values.enum");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Quick POC of Implementation */
var myGamePieces = [];
var opponentPiecePositions = [[0, 0], [0, 2], [2, 0], [2, 2]];
opponentPiecePositions.map(function (o) {
  var opponentPiece = new _gamePiece.default(o[0], o[1], _cellValues.CELL_VALUES_ENUM.white);
  myGamePieces.push(opponentPiece);
});
var playerPosition = [1, 1];
var playerPiece = new _gamePiece.default(playerPosition[0], playerPosition[1], _cellValues.CELL_VALUES_ENUM.black);
myGamePieces.push(playerPiece);
var myGameBoard = new _gameBoard.default(myGamePieces);
console.log(new _checkersChecker.default().getValidJumps(myGameBoard, [1, 1], 4));