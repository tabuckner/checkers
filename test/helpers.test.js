import Helpers from "../src/helpers";
import { CELL_VALUES_ENUM } from "../src/constants/cell-values.enum";
import GameBoard from "../src/game-board";

describe('Helpers', () => {

  describe('#isPlayablePosition', () => {
    it('should throw for locked cells', () => {
      expect(() => {
        Helpers.isPlayablePosition(CELL_VALUES_ENUM.locked);
      }).toThrow();
    });

    it('should return true for valid cells', () => {
      expect(() => {
        Helpers.isPlayablePosition(CELL_VALUES_ENUM.empty);
      }).not.toThrow();
      expect(Helpers.isPlayablePosition(CELL_VALUES_ENUM.empty)).toBe(true);
    });

    it('should return true for valid cells', () => {
      expect(() => {
        Helpers.isPlayablePosition(CELL_VALUES_ENUM.white);
      }).not.toThrow();
      expect(Helpers.isPlayablePosition(CELL_VALUES_ENUM.white)).toBe(true);
    });

    it('should return true for valid cells', () => {
      expect(() => {
        Helpers.isPlayablePosition(CELL_VALUES_ENUM.black);
      }).not.toThrow();
      expect(Helpers.isPlayablePosition(CELL_VALUES_ENUM.black)).toBe(true);
    });
  });

  describe('#isPositionEmpty', () => {
    it('should return true if empty', () => {
      expect(Helpers.isPositionEmpty(CELL_VALUES_ENUM.empty)).toBe(true);
    });

    it('should return false if occupado', () => {
      expect(Helpers.isPositionEmpty(CELL_VALUES_ENUM.white)).toBe(false)
    });
  });

  describe('#isPositionOutOfBounds', () => {
    it('should return true if so', () => {
      const mockCoord = [3,3];
      const mockBoardSize = 2;
      const testEval = Helpers.isPositionOutOfBounds(mockCoord, mockBoardSize);
      expect(testEval).toBe(true);
    });

    it('should return false if not', () => {
      const mockCoord = [3,3];
      const mockBoardSize = 4;
      const testEval = Helpers.isPositionOutOfBounds(mockCoord, mockBoardSize);
      expect(testEval).toBe(false);
    });
  });

  describe('#getPointValue', () => {
    it('should return the value at a given point', () => {
      const mockBoard = new GameBoard();
      const mockPoint = [0,0];
      const testEval = Helpers.getPointValue(mockBoard, mockPoint);
      expect(testEval).toBe(CELL_VALUES_ENUM.empty);
    });
  });
});