import CheckersChecker from '../src/index';
import GameBoard from '../src/game-board';

describe('CheckersChecker', () => {
  /** @type {CheckersChecker} */
  let instance;

  beforeEach(() => {
    instance = new CheckersChecker();
  });

  describe('some tests', () => {
  
    it('Can be instantiated.', () => {
      expect(instance).toBeInstanceOf(CheckersChecker);
    });
  
    it('has a `gamePieces` prop', () => {
      expect(instance.gamePieces.length).toBe(1);
    });
  });

  describe('#getValidJumps', () => {

    it('should require a board and position', () => {
      expect(() => {
        instance.getValidJumps();
      }).toThrow();
    });

    it('should return an empty array if there is no piece at provided position', () => {
      const mockBoard = new GameBoard();
      const mockPosition = [0, 0];
      const testEval = instance.getValidJumps(mockBoard, mockPosition);
      expect(testEval).toBeInstanceOf(Array)
      expect(testEval.length).toBe(0);
    });

    it('should not allow game pieces at invalid positions', () => {
      const mockBoard = new GameBoard();
      const mockPosition = [0, 1];
      expect(() => {
        instance.getValidJumps(mockBoard, mockPosition);
      }).toThrow();
    });

    it('should return an empty array if there are no valid jumps', () => {
      
    });

  });

  describe('#_getPotentialCells', () => {
    it('should return a list of potentials', () => {
      const mockBoard = new GameBoard();
      const mockPosition = [0, 0];
      const testEval = instance._getPotentialCells(mockBoard, mockPosition);
      expect(testEval.length).toBe(1);
      expect(testEval[0]).toEqual(expect.arrayContaining([1, 1]))
    });

    it('should return a longer list of potentials', () => {
      const mockBoard = new GameBoard();
      const mockPosition = [1, 1];
      const testEval = instance._getPotentialCells(mockBoard, mockPosition);
      expect(testEval.length).toBe(4);
      expect(testEval[0]).toEqual(expect.arrayContaining([0, 0]))
      expect(testEval[1]).toEqual(expect.arrayContaining([2, 0]))
      expect(testEval[2]).toEqual(expect.arrayContaining([2, 2]))
      expect(testEval[3]).toEqual(expect.arrayContaining([0, 2]))
    });
  });
});
