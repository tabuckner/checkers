"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cellValues = require("./constants/cell-values.enum");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Helpers =
/*#__PURE__*/
function () {
  function Helpers() {
    _classCallCheck(this, Helpers);
  }

  _createClass(Helpers, null, [{
    key: "isPlayablePosition",

    /**
     * Given a position's value, will return if that position is a playable cell.
     * @param {number} positionValue the value at a given [x,y] position
     */
    value: function isPlayablePosition(positionValue) {
      if (positionValue === _cellValues.CELL_VALUES_ENUM.locked) {
        throw new Error('Cannot place a GamePiece at this position');
      }

      return true;
    }
    /**
     * Given a position's value, will return if that position is 'empty'.
     * @param {number} positionValue the value at a give [x,y] position
     */

  }, {
    key: "isPositionEmpty",
    value: function isPositionEmpty(positionValue) {
      return positionValue === _cellValues.CELL_VALUES_ENUM.empty;
    }
    /**
     * Given an [x,y] pair and a board size, returns if the coords are out of bounds.
     * @param {Array<number>} position [x,y] coords
     * @param {number} boardSize size of the board
     */

  }, {
    key: "isPositionOutOfBounds",
    value: function isPositionOutOfBounds(position, boardSize) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = position[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var coord = _step.value;

          if (coord > boardSize || coord < 0) {
            return true;
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

      return false;
    }
    /**
     * Given a board and point, returns the value at that coordinate.
     * @param {GameBoard} board 
     * @param {Array<number>} point [x,y] coords
     */

  }, {
    key: "getPointValue",
    value: function getPointValue(board, point) {
      return board[point[0]][point[1]];
    }
  }]);

  return Helpers;
}();

exports.default = Helpers;