import GamePiece from '../src/game-piece';
import { COLORS_ENUM } from '../src/constants/colors.enum';

describe('GamePiece', () => {
  /** @type {GamePiece} */
  let instance;
  const mockData = {
    xPos: 1,
    yPos: 2,
    color: COLORS_ENUM.black
  }

  describe('valid instance params', () => {
    
    beforeEach(() => {
      instance = new GamePiece(mockData.xPos, mockData.yPos, mockData.color);
    });
    
    it('should be defined', () => {
      expect(instance).toBeDefined();
      expect(instance).toBeInstanceOf(GamePiece);
    });
  
    it('should set color', () => {
      expect(instance.color = mockData.color);
    });
  
    it('should set xPos', () => {
      expect(instance.xPos = mockData.xPos);
    });
  
    it('should set yPos', () => {
      expect(instance.yPos = mockData.yPos);
    });
  
    it('#checkColorParam', () => {
      const spy = jest.spyOn(GamePiece.prototype, 'checkColorParam');
      const localInstance = new GamePiece(2, 3, COLORS_ENUM.white);
      expect(spy).toHaveBeenCalledWith(COLORS_ENUM.white);
    });
  });

  describe('invalid instance params', () => {
    /** @type {GamePiece} */
    let instance;
    const localMockData = {
      xPos: 1,
      yPos: 2,
      color: 'grey'
    };
  
    it('should be an error', () => {
      expect(() => {
        instance = new GamePiece(localMockData.xPos, localMockData.yPos, localMockData.color);
      }).toThrow();
    });
  });
});
