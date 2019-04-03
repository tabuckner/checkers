import CheckersChecker from '../src/index';
import GameBoard from '../src/game-board';
import GamePiece from '../src/game-piece';
import { COLORS_ENUM } from '../src/constants/colors.enum';

describe('CheckersChecker', () => {
  /** @type {CheckersChecker} */
  let instance;

  beforeEach(() => {
    instance = new CheckersChecker();
    expect(instance).toBeDefined();
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

  describe('#_filterOpponentCells', () => {
    it('should return a filtered array', () => {
      const mockPlayerPiece = new GamePiece(0, 0, COLORS_ENUM.white);
      const mockOpponentPiece = new GamePiece(1, 1, COLORS_ENUM.black);
      const mockBoard = new GameBoard([mockPlayerPiece, mockOpponentPiece]);
      const mockPlayerPosition = [0,0];
      const mockPlayerValue = mockBoard[0][0];
      const mockPotentialCells = instance._getPotentialCells(mockBoard, mockPlayerPosition);
      const testEval = instance._filterOpponentCells(mockPotentialCells, mockPlayerValue, mockBoard);
      expect(testEval.length).toBe(1);
      expect(testEval[0]).toEqual(expect.arrayContaining([1, 1]));
    });

    it('should return an empty array if no opponents available', () => {
      const mockPlayerPiece = new GamePiece(0, 0, COLORS_ENUM.white);
      const mockBoard = new GameBoard([mockPlayerPiece]);
      const mockPlayerPosition = [0,0];
      const mockPlayerValue = mockBoard[0][0];
      const mockPotentialCells = instance._getPotentialCells(mockBoard, mockPlayerPosition);
      const testEval = instance._filterOpponentCells(mockPotentialCells, mockPlayerValue, mockBoard);
      expect(testEval.length).toBe(0)
    })
  });
});
