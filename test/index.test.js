import CheckersChecker from '../src/checkers-checker';
import GameBoard from '../src/game-board';
import GamePiece from '../src/game-piece';
import { CELL_VALUES_ENUM } from '../src/constants/cell-values.enum';
import Helpers from '../src/helpers';

describe('CheckersChecker', () => {
  /** @type {CheckersChecker} */
  let instance;

  beforeEach(() => {
    instance = new CheckersChecker();
    expect(instance).toBeDefined();
  });

  it('Can be instantiated.', () => {
    expect(instance).toBeDefined();
    expect(instance).toBeInstanceOf(CheckersChecker);
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

    it('should return an empty array if there are adjacent opponents', () => {
      spyOn(instance, '_getPotentialCells').and.returnValue(true);
      spyOn(instance, '_filterOpponentCells').and.returnValue([]);
      const mockGamePiece = new GamePiece(0, 0, CELL_VALUES_ENUM.black);
      const mockBoard = new GameBoard([mockGamePiece]);
      const mockPosition = [0, 0];
      const testEval = instance.getValidJumps(mockBoard, mockPosition);
      expect(testEval.length).toBe(0);
    });

    it('should return an array of nearbyOpponents and postJumpPosition', () => {
      const mockPieces = [];
      const mockPiecePositions = [[0, 0], [0, 2], [2, 0], [2, 2]];
      mockPiecePositions.map((o) => {
        const mockPiece = new GamePiece(o[0], o[1], CELL_VALUES_ENUM.white, mockPiecePositions.length);
        mockPieces.push(mockPiece);
      });
      const playerPiece = new GamePiece(1, 1, CELL_VALUES_ENUM.black);
      mockPieces.push(playerPiece);
      const mockBoard = new GameBoard(mockPieces, 4);
      const testEval = instance.getValidJumps(mockBoard, [1, 1], 4);
      expect(testEval.length).toBe(1);
      expect(testEval[0].length).toBe(2);
      expect(testEval[0][0]).toEqual(expect.arrayContaining([2,2]));
      expect(testEval[0][1]).toEqual(expect.arrayContaining([3,3]));
    });
  });

  describe('#_populateJumpOptions', () => {
    it('should call post jump coordinates', () => {
      const mockAdjacentOpponentCells = [1];
      spyOn(instance, '_getPostJumpCoordinates').and.returnValue(true);
      spyOn(Helpers, 'isPositionOutOfBounds').and.returnValue(true);
      instance._populateJumpOptions(mockAdjacentOpponentCells, [0,0], []);
      expect(instance._getPostJumpCoordinates).toHaveBeenCalled();
    });

    it('should push valid options onto provided array', () => {
      const mockAdjacentOpponentCells = [1];
      spyOn(instance, '_getPostJumpCoordinates').and.returnValue(true);
      spyOn(Helpers, 'isPositionOutOfBounds').and.returnValue(false);
      const mockReturnArray = [];
      instance._populateJumpOptions(mockAdjacentOpponentCells, [0,0], mockReturnArray);
      expect(instance._getPostJumpCoordinates).toHaveBeenCalled();
      expect(mockReturnArray[0][0]).toBe(1);
      expect(mockReturnArray[0][1]).toBe(true);
    });
  });

  describe('#_getPostJumpCoordinates', () => {
    it('should return post jump coordinates', () => {
      const mockPlayerPosition = [1,1];
      const mockOpponentPosition = [2,2];
      const testEval = instance._getPostJumpCoordinates(mockPlayerPosition, mockOpponentPosition);
      expect(testEval[0]).toBe(3);
      expect(testEval[0]).toBe(3);
    });
  });

  describe('#_getAdjacentOpponentCells', () => {
    let mockPosition;
    beforeEach(() => {
      mockPosition = [0,0];
      instance._gameBoard = 1;
      spyOn(Helpers, 'getPointValue').and.returnValue(true);
      spyOn(instance, '_getPotentialCells').and.returnValue(true);
      spyOn(instance, '_filterOpponentCells').and.returnValue(true);
      instance._getAdjacentOpponentCells(mockPosition);
    });

    it('should get the players point value', () => {
      expect(Helpers.getPointValue).toHaveBeenCalledWith(instance._gameBoard, mockPosition);
    });

    it('should get potential cells with position', () => {
      expect(instance._getPotentialCells).toHaveBeenCalledWith(mockPosition);
    });

    it('should filter those cells', () => {
      expect(instance._filterOpponentCells).toHaveBeenCalledWith(true, true);
    });
  });

  describe('#_filterOpponentCells', () => {
    it('should return a filtered array', () => {
      const mockPlayerPiece = new GamePiece(0, 0, CELL_VALUES_ENUM.white);
      const mockOpponentPiece = new GamePiece(1, 1, CELL_VALUES_ENUM.black);
      const mockBoard = new GameBoard([mockPlayerPiece, mockOpponentPiece]);
      instance._gameBoard = mockBoard;
      const mockPlayerPosition = [0,0];
      const mockPlayerValue = mockBoard[0][0];
      const mockPotentialCells = instance._getPotentialCells(mockPlayerPosition);
      const testEval = instance._filterOpponentCells(mockPotentialCells, mockPlayerValue);
      expect(testEval.length).toBe(1);
      expect(testEval[0]).toEqual(expect.arrayContaining([1, 1]));
    });

    it('should return an empty array if no opponents available', () => {
      const mockPlayerPiece = new GamePiece(0, 0, CELL_VALUES_ENUM.white);
      const mockBoard = new GameBoard([mockPlayerPiece]);
      instance._boardSize = mockBoard;
      const mockPlayerPosition = [0,0];
      const mockPlayerValue = mockBoard[0][0];
      const mockPotentialCells = instance._getPotentialCells(mockBoard, mockPlayerPosition);
      const testEval = instance._filterOpponentCells(mockPotentialCells, mockPlayerValue);
      expect(testEval.length).toBe(0)
    })
  });

  describe('#_getPotentialCells', () => {
    it('should return a list of potentials', () => {
      const mockBoard = new GameBoard();
      const mockPosition = [0, 0];
      instance._gameBoard = mockBoard;
      const testEval = instance._getPotentialCells(mockPosition);
      expect(testEval.length).toBe(1);
      expect(testEval[0]).toEqual(expect.arrayContaining([1, 1]))
    });

    it('should return a longer list of potentials', () => {
      const mockBoard = new GameBoard();
      const mockPosition = [1, 1];
      instance._gameBoard = mockBoard;
      const testEval = instance._getPotentialCells(mockPosition);
      expect(testEval.length).toBe(4);
      expect(testEval[0]).toEqual(expect.arrayContaining([0, 0]))
      expect(testEval[1]).toEqual(expect.arrayContaining([2, 0]))
      expect(testEval[2]).toEqual(expect.arrayContaining([2, 2]))
      expect(testEval[3]).toEqual(expect.arrayContaining([0, 2]))
    });
  });

});
