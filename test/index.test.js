import CheckersChecker from '../src/index';

describe('CheckersChecker', () => {
  /** @type {CheckersChecker} */
  let instance;

  beforeEach(() => {
    instance = new CheckersChecker();
  });

  it('Can be instantiated.', () => {
    expect(instance).toBeInstanceOf(CheckersChecker);
  });

  it('has a `gamePieces` prop', () => {
    expect(instance.gamePieces.length).toBe(1);
  });
});
