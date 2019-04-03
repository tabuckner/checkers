import Helpers from "../src/helpers";
import { COLORS_ENUM } from "../src/constants/colors.enum";

describe('Helpers', () => {

  describe('#isPlayablePosition', () => {
    it('should throw for locked cells', () => {
      expect(() => {
        Helpers.isPlayablePosition(COLORS_ENUM.locked);
      }).toThrow();
    });

    it('should return true for valid cells', () => {
      expect(() => {
        Helpers.isPlayablePosition(COLORS_ENUM.empty);
      }).not.toThrow();
      expect(Helpers.isPlayablePosition(COLORS_ENUM.empty)).toBe(true);
    });

    it('should return true for valid cells', () => {
      expect(() => {
        Helpers.isPlayablePosition(COLORS_ENUM.white);
      }).not.toThrow();
      expect(Helpers.isPlayablePosition(COLORS_ENUM.white)).toBe(true);
    });

    it('should return true for valid cells', () => {
      expect(() => {
        Helpers.isPlayablePosition(COLORS_ENUM.black);
      }).not.toThrow();
      expect(Helpers.isPlayablePosition(COLORS_ENUM.black)).toBe(true);
    });
  });

  describe('#isPositionEmpty', () => {
    it('should return true if empty', () => {
      expect(Helpers.isPositionEmpty(COLORS_ENUM.empty)).toBe(true);
    });

    it('should return false if occupado', () => {
      expect(Helpers.isPositionEmpty(COLORS_ENUM.white)).toBe(false)
    });
  });
});