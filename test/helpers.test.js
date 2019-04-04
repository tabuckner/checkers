import Helpers from "../src/helpers";
import { CELL_VALUES_ENUM } from "../src/constants/cell-values.enum";

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
});