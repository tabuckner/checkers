"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _gameBoard = _interopRequireDefault(require("./game-board"));

var _helpers = _interopRequireDefault(require("./helpers"));

var _boardSize = require("./constants/board-size");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
var CheckersChecker =
/*#__PURE__*/
function () {
  /** @type {GameBoard} */
  function CheckersChecker() {
    _classCallCheck(this, CheckersChecker);

    _defineProperty(this, "_boardSize", _boardSize.BOARD_SIZE);

    _defineProperty(this, "_gameBoard", void 0);
  }
  /**
   * Given a board of type GameBoard, and a position (x,y), returns a multidimensional
   * array of valid moves that may be chained together.
   * @param {Array<Array<number>>} board return value of GameBoard constructor.
   * @param {Array<number>} position - [x,y]. // TODO: Use `Set` instead of array for O(1) time comp.
   */


  _createClass(CheckersChecker, [{
    key: "getValidJumps",
    value: function getValidJumps(board, position) {
      if (!board || !position) {
        throw new Error('Board and Position must be provided.');
      }

      this._gameBoard = board;
      var returnArray = [];

      var pointValue = _helpers.default.getPointValue(this._gameBoard, position); // TODO: Change helpers to accept position.


      if (!_helpers.default.isPlayablePosition(pointValue)) {
        return;
      }

      if (_helpers.default.isPositionEmpty(pointValue)) {
        return returnArray;
      }

      var adjacentOpponentCells = this._getAdjacentOpponentCells(position);

      if (adjacentOpponentCells.length === 0) {
        return returnArray;
      }

      this._populateJumpOptions(adjacentOpponentCells, position, returnArray);

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

  }, {
    key: "_populateJumpOptions",
    value: function _populateJumpOptions(adjacentOpponentCells, playerCoords, returnArray) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = adjacentOpponentCells[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var adjacentOpponentCell = _step.value;
          var optionArray = []; // get postJumpPosition coordinates

          var postJumpCoords = this._getPostJumpCoordinates(playerCoords, adjacentOpponentCell); // if the postJumpPosition is out of bounds do nothing


          var postJumpIsOutOfBounds = _helpers.default.isPositionOutOfBounds(postJumpCoords, this._boardSize);

          if (!postJumpIsOutOfBounds) {
            // push opponentCell onto optionArray
            optionArray.push(adjacentOpponentCell); // push it onto the options array

            optionArray.push(postJumpCoords); // push onto return array

            returnArray.push(optionArray);
          }
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
    /**
     * Given a player position, and opponent position, will return `post-jump` coordinates.
     * @param {Array<number>} playerPosition players [x,y] coordinates
     * @param {Array<number>} opponentPosition players [x,y] coordinates
     */

  }, {
    key: "_getPostJumpCoordinates",
    value: function _getPostJumpCoordinates(playerPosition, opponentPosition) {
      var jumpOver = function jumpOver(p, o) {
        return (o - p) * 2 + p;
      };

      var playerXPos = playerPosition[0];
      var playerYPos = playerPosition[1];
      var opponentXPos = opponentPosition[0];
      var opponentYPos = opponentPosition[1];
      var postJumpXPos = jumpOver(playerXPos, opponentXPos);
      var postJumpYPos = jumpOver(playerYPos, opponentYPos);
      var postJumpCoords = [postJumpXPos, postJumpYPos];
      return postJumpCoords;
    }
    /**
     * Given a GameBoard and position, returns 2d array of coordinates for cells
     * containing an opponent piece.
     * @param {Array<number>} position [x,y] coords
     */

  }, {
    key: "_getAdjacentOpponentCells",
    value: function _getAdjacentOpponentCells(position) {
      var pointValue = _helpers.default.getPointValue(this._gameBoard, position);

      var potentialCells = this._getPotentialCells(position);

      return this._filterOpponentCells(potentialCells, pointValue);
    }
    /**
     * Given a 2d array of coordinates for cells potentially containing an opponent piece,
     * returns 2d array of coordinates for cells absolutely containing an opponent piece.
     * @param {Array<Array<number>>} potentialCells nested array of potential cells
     * @param {number} playerValue the current player's value
     * 
     * NOTE: potentialCells is assumed to only contain playable positions.
     */

  }, {
    key: "_filterOpponentCells",
    value: function _filterOpponentCells(potentialCells, playerValue) {
      var _this = this;

      return potentialCells.filter(function (cell) {
        var xPos = cell[0];
        var yPos = cell[1];
        var targetValue = _this._gameBoard[xPos][yPos];

        if (targetValue !== playerValue && !_helpers.default.isPositionEmpty(targetValue)) {
          return true;
        }

        return false;
      });
    }
    /**
     * Given a position [x,y], returns an array of [x,y] coordinates for valid player moves.
     * @param {Array<number>} position [x, y]
     */

  }, {
    key: "_getPotentialCells",
    value: function _getPotentialCells(position) {
      var _this2 = this;

      var potentialCells = [];
      var xPos = position[0];
      var yPos = position[1];
      var posModulations = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
      posModulations.map(function (modulation) {
        var xModulation = modulation[0];
        var yModulation = modulation[1];
        var targetXPos = xPos + xModulation;
        var targetYPos = yPos + yModulation;

        if (targetXPos > -1 && targetYPos > -1) {
          var targetValue = _this2._gameBoard[targetXPos][targetYPos];

          if (_helpers.default.isPlayablePosition(targetValue)) {
            potentialCells.push([targetXPos, targetYPos]);
          }
        }
      });
      return potentialCells;
    }
  }]);

  return CheckersChecker;
}();

exports.default = CheckersChecker;
;