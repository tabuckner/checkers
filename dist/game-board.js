"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _gamePiece = _interopRequireDefault(require("./game-piece"));

var _cellValues = require("./constants/cell-values.enum");

var _boardSize = require("./constants/board-size");

var _helpers = _interopRequireDefault(require("./helpers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var GameBoard =
/*#__PURE__*/
function () {
  /** @type {Array<Array>} */

  /**
   * @param {number} boardSize one dimensional size of grid
   * @param {Array<GamePiece>} gamePieces array of GamePiece
   */
  function GameBoard() {
    var gamePieces = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var boardSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _boardSize.BOARD_SIZE;
    var board = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    _classCallCheck(this, GameBoard);

    _defineProperty(this, "board", []);

    this._initializeBoard(boardSize, board);

    this._populateBoard(gamePieces);

    return this.board;
  }
  /**
   * Given an array of gamepieces, will populate an initialized board.
   * @param {Array<GamePiece>} gamePieces array of gamepieces.
   */


  _createClass(GameBoard, [{
    key: "_populateBoard",
    value: function _populateBoard(gamePieces) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = gamePieces[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var piece = _step.value;

          this._addPiece(piece);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: "_initializeBoard",
    value: function _initializeBoard(boardSize, board) {
      this.board = board;

      for (var i = 0; i < boardSize; i++) {
        var newRow = [];
        var reverse = i % 2 == 0 ? true : false;

        for (var j = 0; j < boardSize; j++) {
          var pushVal = j % 2 !== 0 ? _cellValues.CELL_VALUES_ENUM.empty : _cellValues.CELL_VALUES_ENUM.locked;
          newRow.push(pushVal);
        }

        if (reverse) {
          newRow = newRow.reverse();
        }

        this.board.push(newRow);
      }
    }
    /**
     * Given a game piece, will attempt to add pieces to playable positions.
     * @param {GamePiece} piece 
     */

  }, {
    key: "_addPiece",
    value: function _addPiece(piece) {
      var destinationCellValue = this.board[piece.yPos][piece.xPos];

      if (_helpers.default.isPlayablePosition(destinationCellValue)) {
        this.board[piece.yPos][piece.xPos] = piece.color;
      }
    }
  }]);

  return GameBoard;
}();

exports.default = GameBoard;
;