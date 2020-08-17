
import {BestPriceElectionAlgorithm}
// eslint-disable-next-line max-len
  from '../../../../src/contexts/travel-quotation/algorithms/BestPriceElectionAlgorithm';

describe('BestPriceElectionAlgorithm', () => {
  it('get best possibilities', () => {
    const algorithm = new BestPriceElectionAlgorithm();

    algorithm.setPossibilities([
      [{from: 'GRU', to: 'BRC', price: 10}],
      [{from: 'GRU', to: 'BRC', price: 9}],
      [
        {from: 'GRU', to: 'SCL', price: 1},
        {from: 'SCL', to: 'ORL', price: 1},
        {from: 'ORL', to: 'CDG', price: 1},
        {from: 'CDG', to: 'BRC', price: 2},
      ],
    ]);

    const bestPossibility = algorithm.getElected();

    expect(bestPossibility.route).toEqual([
      {from: 'GRU', to: 'SCL', price: 1},
      {from: 'SCL', to: 'ORL', price: 1},
      {from: 'ORL', to: 'CDG', price: 1},
      {from: 'CDG', to: 'BRC', price: 2},
    ]);

    expect(bestPossibility.price).toBe(5);
  });

  it('get best possibilities - same prices', () => {
    const algorithm = new BestPriceElectionAlgorithm();

    algorithm.setPossibilities([
      [{from: 'GRU', to: 'BRC', price: 5}],
      [{from: 'GRU', to: 'BRC', price: 5}],
      [
        {from: 'GRU', to: 'SCL', price: 1},
        {from: 'SCL', to: 'ORL', price: 1},
        {from: 'ORL', to: 'CDG', price: 1},
        {from: 'CDG', to: 'BRC', price: 2},
      ],
    ]);

    const bestPossibility = algorithm.getElected();

    expect(bestPossibility.route).toEqual([
      {from: 'GRU', to: 'BRC', price: 5},
    ]);

    expect(bestPossibility.price).toBe(5);
  });
});
