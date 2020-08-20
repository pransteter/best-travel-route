
import {KeepLastPointPossibilitiesAlgorithm}
  // eslint-disable-next-line max-len
  from '../../../../src/contexts/travel-quotation/algorithms/KeepLastPointPossibilitiesAlgorithm';

describe('KeepLastPointPossibilitiesAlgorithm', () => {
  it('get all possibilities - simple case', () => {
    const algorithm = new KeepLastPointPossibilitiesAlgorithm();
    algorithm.setAllRoutes([
      {from: 'GRU', to: 'BRC', price: 10},
      {from: 'BRC', to: 'SCL', price: 5},
      {from: 'GRU', to: 'CDG', price: 75},
      {from: 'GRU', to: 'SCL', price: 20},
      {from: 'GRU', to: 'ORL', price: 56},
      {from: 'ORL', to: 'CDG', price: 5},
      {from: 'SCL', to: 'ORL', price: 20},
    ]);
    algorithm.setFirstPoint('GRU');
    algorithm.setLastPoint('BRC');
    const result = algorithm.getPossibilities();

    expect(result).toEqual([
      [{from: 'GRU', to: 'BRC', price: 10}],
    ]);
  });

  it('get all possibilities - only one scale case', () => {
    const algorithm = new KeepLastPointPossibilitiesAlgorithm();
    algorithm.setAllRoutes([
      {from: 'GRU', to: 'BRC', price: 10},
      {from: 'GRU', to: 'SCL', price: 20},
      {from: 'SCL', to: 'BRC', price: 56},
    ]);
    algorithm.setFirstPoint('GRU');
    algorithm.setLastPoint('BRC');
    const result = algorithm.getPossibilities();

    expect(result).toEqual([
      [{from: 'GRU', to: 'BRC', price: 10}],
      [
        {from: 'GRU', to: 'SCL', price: 20},
        {from: 'SCL', to: 'BRC', price: 56},
      ],
    ]);
  });

  it('get all possibilities - two scale case', () => {
    const algorithm = new KeepLastPointPossibilitiesAlgorithm();
    algorithm.setAllRoutes([
      {from: 'GRU', to: 'BRC', price: 10},
      {from: 'GRU', to: 'SCL', price: 20},
      {from: 'SCL', to: 'ORL', price: 56},
      {from: 'ORL', to: 'BRC', price: 5},
    ]);
    algorithm.setFirstPoint('GRU');
    algorithm.setLastPoint('BRC');
    const result = algorithm.getPossibilities();

    expect(result).toEqual([
      [{from: 'GRU', to: 'BRC', price: 10}],
      [
        {from: 'GRU', to: 'SCL', price: 20},
        {from: 'SCL', to: 'ORL', price: 56},
        {from: 'ORL', to: 'BRC', price: 5},
      ],
    ]);
  });

  it('get all possibilities - three scale case', () => {
    const algorithm = new KeepLastPointPossibilitiesAlgorithm();
    algorithm.setAllRoutes([
      {from: 'GRU', to: 'BRC', price: 10},
      {from: 'GRU', to: 'SCL', price: 20},
      {from: 'SCL', to: 'ORL', price: 56},
      {from: 'ORL', to: 'CDG', price: 18},
      {from: 'CDG', to: 'BRC', price: 5},
    ]);
    algorithm.setFirstPoint('GRU');
    algorithm.setLastPoint('BRC');
    const result = algorithm.getPossibilities();

    expect(result).toEqual([
      [{from: 'GRU', to: 'BRC', price: 10}],
      [
        {from: 'GRU', to: 'SCL', price: 20},
        {from: 'SCL', to: 'ORL', price: 56},
        {from: 'ORL', to: 'CDG', price: 18},
        {from: 'CDG', to: 'BRC', price: 5},
      ],
    ]);
  });

  it('get all possibilities - no possibility', () => {
    const algorithm = new KeepLastPointPossibilitiesAlgorithm();
    algorithm.setAllRoutes([
      {from: 'GRU', to: 'BRC', price: 10},
      {from: 'GRU', to: 'SCL', price: 20},
      {from: 'SCL', to: 'ORL', price: 56},
      {from: 'ORL', to: 'CDG', price: 18},
      {from: 'CDG', to: 'BRC', price: 5},
    ]);
    algorithm.setFirstPoint('URU');
    algorithm.setLastPoint('MEX');
    const result = algorithm.getPossibilities();

    expect(result).toEqual([]);
  });

  it('get all possibilities - duplicated route should keep the last', () => {
    const algorithm = new KeepLastPointPossibilitiesAlgorithm();
    algorithm.setAllRoutes([
      {from: 'GRU', to: 'BRC', price: 10},
      {from: 'BRC', to: 'SCL', price: 5},
      {from: 'GRU', to: 'CDG', price: 75},
      {from: 'GRU', to: 'SCL', price: 20},
      {from: 'GRU', to: 'ORL', price: 56},
      {from: 'ORL', to: 'CDG', price: 5},
      {from: 'SCL', to: 'ORL', price: 20},
      {from: 'GRU', to: 'BRC', price: 33},

    ]);
    algorithm.setFirstPoint('GRU');
    algorithm.setLastPoint('BRC');
    const result = algorithm.getPossibilities();

    expect(result).toEqual([
      [{from: 'GRU', to: 'BRC', price: 33}],
    ]);
  });
});
