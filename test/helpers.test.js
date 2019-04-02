import Helpers from "../src/helpers";
import { COLORS_ENUM } from "../src/constants/colors.enum";

describe('Helpers', () => {

  describe('#getIsPayablePosition', () => {
    it('should throw for locked cells', () => {
      expect(() => {
        Helpers.getIsPlayablePosition(COLORS_ENUM.locked);
      }).toThrow();
    });

    it('should return true for valid cells', () => {
      expect(() => {
        Helpers.getIsPlayablePosition(COLORS_ENUM.empty);
      }).not.toThrow();
    });

    it('should return true for valid cells', () => {
      expect(() => {
        Helpers.getIsPlayablePosition(COLORS_ENUM.white);
      }).not.toThrow();
    });

    it('should return true for valid cells', () => {
      expect(() => {
        Helpers.getIsPlayablePosition(COLORS_ENUM.black);
      }).not.toThrow();
    });
  });
});