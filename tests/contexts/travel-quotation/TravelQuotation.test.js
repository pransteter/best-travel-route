const {TravelQuotation} = require(
    '../../../src/contexts/travel-quotation/TravelQuotation',
);

describe('TraveQuotation context', () => {
  const repositoryMock = {
    getAllRoutes: jest.fn(),
  };

  const keepLastPointPossibilitiesAlgorithm = {
    setAllRoutes: jest.fn(),
    setFirstPoint: jest.fn(),
    setLastPoint: jest.fn(),
    getPossibilities: jest.fn(),
  };

  const bestPriceElectionAlgorithm = {
    setPossibilities: jest.fn(),
    getElected: jest.fn(),
  };

  beforeEach(() => {
    repositoryMock.getAllRoutes.mockReset();
    keepLastPointPossibilitiesAlgorithm.setAllRoutes.mockReset();
    keepLastPointPossibilitiesAlgorithm.getPossibilities.mockReset();
    bestPriceElectionAlgorithm.setPossibilities.mockReset();
    bestPriceElectionAlgorithm.getElected.mockReset();
  });

  it('Get best travel - success', () => {
    const from = 'GRU';
    const to = 'BRC';
    repositoryMock.getAllRoutes.mockReturnValue(['GRU,BRC,10']);
    keepLastPointPossibilitiesAlgorithm.getPossibilities.mockReturnValue(
        [{'GRU,BRC': 10}],
    );
    bestPriceElectionAlgorithm.getElected.mockReturnValue('GRU - BRC > $10');

    const context = new TravelQuotation(repositoryMock);
    context.setPossibilitiesAlgorithm(keepLastPointPossibilitiesAlgorithm);
    context.setElectionAlgorithm(bestPriceElectionAlgorithm);

    const result = context.getBestQuotation(from, to);
    expect(result).toBe('GRU - BRC > $10');
  });

  it(
      'Get best travel quotation without election and possibilities algorithms',
      () => {
        const context = new TravelQuotation(repositoryMock);

        expect(() => {
          context.getBestQuotation();
        }).toThrowError(
            'There is no possibilities algorithm to get possibilities.',
        );
      },
  );

  it(
      'Get best travel quotation without election algorithm',
      () => {
        const context = new TravelQuotation(repositoryMock);
        context.setPossibilitiesAlgorithm(keepLastPointPossibilitiesAlgorithm);

        expect(() => {
          context.getBestQuotation();
        }).toThrowError(
            'There is no election algorithm to get elected route.',
        );
      },
  );

  it(
      'Get best travel quotation without possibilities algorithm',
      () => {
        const context = new TravelQuotation(repositoryMock);
        context.setElectionAlgorithm(bestPriceElectionAlgorithm);

        expect(() => {
          context.getBestQuotation();
        }).toThrowError(
            'There is no possibilities algorithm to get possibilities.',
        );
      },
  );
});
