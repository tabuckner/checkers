import GamePiece from '../src/game-piece';
import { COLORS_ENUM } from '../src/constants/colors.enum';
import { BOARD_SIZE } from '../src/constants/board-size';

describe('GamePiece', () => {
  /** @type {GamePiece} */
  let instance;
  const mockData = {
    xPos: 1,
    yPos: 2,
    color: COLORS_ENUM.black
  }

  beforeEach(() => {
    instance = new GamePiece(mockData.xPos, mockData.yPos, mockData.color);

  });
  
  it('should be defined', () => {
    expect(instance).toBeDefined();
    expect(instance).toBeInstanceOf(GamePiece);
  });

  describe('constructor', () => {
    
    it('should set color', () => {
      expect(instance.color = mockData.color);
    });
  
    it('should set xPos', () => {
      expect(instance.xPos = mockData.xPos);
    });
  
    it('should set yPos', () => {
      expect(instance.yPos = mockData.yPos);
    });
  
  });

  describe('#_checkColorParam', () => {

    it('should throw an error for invalid strings', () => {
      expect(() => {
        new GamePiece(2, 3, 'grey')
      }).toThrow();
    });

    it('should set valid strings', () => {
      const spy = jest.spyOn(GamePiece.prototype, '_checkColorParam');
      const localInstance = new GamePiece(2, 3, COLORS_ENUM.white);
      expect(spy).toHaveBeenCalledWith(COLORS_ENUM.white);
    });
  });

  describe('#checkCoordinateBoundary', () => {
    it('should throw error for coords out of bounds', () => {
      const outOfBounds = BOARD_SIZE + 1;
      expect(() => {
        new GamePiece(outOfBounds, outOfBounds, COLORS_ENUM.white);
      }).toThrow();
    });

    it('should return the coord if in bounds', () => {
      expect(instance.xPos).toBe(mockData.xPos);
      expect(instance.yPos).toBe(mockData.yPos);
    });
  });

});
