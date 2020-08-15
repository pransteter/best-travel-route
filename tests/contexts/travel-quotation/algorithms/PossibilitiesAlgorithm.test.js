
import {KeepLastPointPossibilitiesAlgorithm}
  // eslint-disable-next-line max-len
  from '../../../../src/contexts/travel-quotation/algorithms/KeepLastPointPossibilitiesAlgorithm';

describe('PossibilitiesAlgorithm', () => {
  it('get all possibilities - simple case', () => {
    const algorithm = new KeepLastPointPossibilitiesAlgorithm();
    algorithm.setAllRoutes([
      'GRU,BRC,10',
      'BRC,SCL,5',
      'GRU,CDG,75',
      'GRU,SCL,20',
      'GRU,ORL,56',
      'ORL,CDG,5',
      'SCL,ORL,20',
    ]);
    algorithm.setFirstPoint('GRU');
    algorithm.setLastPoint('BRC');
    const result = algorithm.getPossibilities();

    expect(result).toEqual([{'GRU,BRC': 10}]);
  });
});
