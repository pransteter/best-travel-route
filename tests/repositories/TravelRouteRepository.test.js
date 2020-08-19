const {TravelRouteRepository} = require(
    '../../src/repositories/TravelRouteRepository',
);

describe('TravelRouteRepository', () => {
  const adapterMock = {
    setTarget: jest.fn(),
    fetchAll: jest.fn(),
  };

  beforeEach(() => {
    adapterMock.setTarget.mockReset();
    adapterMock.fetchAll.mockReset();
  });

  it('getAllRoutes', () => {
    const fetchAllResult = [
      'GRU,BRC,10',
      'BRC,SCL,5',
      'GRU,CDG,75',
      'GRU,SCL,20',
      'GRU,ORL,56',
      'ORL,CDG,5',
      'SCL,ORL,20',
    ];

    adapterMock.setTarget.mockReturnThis();
    adapterMock.fetchAll.mockReturnValue(fetchAllResult);

    const repository = new TravelRouteRepository(adapterMock);

    const result = repository.getAllRoutes();

    expect(result).toEqual([
      {from: 'GRU', to: 'BRC', price: 10},
      {from: 'BRC', to: 'SCL', price: 5},
      {from: 'GRU', to: 'CDG', price: 75},
      {from: 'GRU', to: 'SCL', price: 20},
      {from: 'GRU', to: 'ORL', price: 56},
      {from: 'ORL', to: 'CDG', price: 5},
      {from: 'SCL', to: 'ORL', price: 20},
    ]);
    expect(adapterMock.setTarget).toHaveBeenCalledTimes(1);
    expect(adapterMock.setTarget).toHaveBeenCalledWith('travel-routes.csv');
    expect(adapterMock.fetchAll).toHaveBeenCalledTimes(1);
  });
});
