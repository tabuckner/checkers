"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cellValues = require("./constants/cell-values.enum");

var _boardSize = require("./constants/board-size");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GamePiece =
/*#__PURE__*/
function () {
  /**
   * @param {number} xPos x coordinate
   * @param {number} yPos y coordinate
   * @param {string} color CELL_VALUES_ENUM
   */
  function GamePiece(xPos, yPos, color) {
    var boardSize = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _boardSize.BOARD_SIZE;

    _classCallCheck(this, GamePiece);

    this._boardSize = boardSize;
    this.xPos = this.checkCoordinateBoundary(xPos);
    this.yPos = this.checkCoordinateBoundary(yPos);
    this.color = this._checkColorParam(color);
  }

  _createClass(GamePiece, [{
    key: "_checkColorParam",
    value: function _checkColorParam(colorParam) {
      if (Object.values(_cellValues.CELL_VALUES_ENUM).indexOf(colorParam) < 0) {
        throw new Error('Color param provided is invalid. Must be `white` or `black`');
      }

      return colorParam;
    }
  }, {
    key: "checkCoordinateBoundary",
    value: function checkCoordinateBoundary(coordinate) {
      if (coordinate > this._boardSize || coordinate < 0) {
        throw new Error('Coordinate exceeds grid boundaries.');
      }

      return coordinate;
    }
  }]);

  return GamePiece;
}();

exports.default = GamePiece;
;