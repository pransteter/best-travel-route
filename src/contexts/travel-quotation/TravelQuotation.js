/**
 * TravelQuotation context class
 */
export class TravelQuotation {
  /**
   * constructor method
   * @param {TravelRepository} repository
   */
  constructor(repository) {
    this.repository = repository;
    this.possibilitiesAlgorithm = null;
    this.electionAlgorithm = null;
  }

  /**
   * setPossibilitiesAlgorithm method
   * @param {PossibilitiesAlgorithm} possibilitiesAlgorithm
   */
  setPossibilitiesAlgorithm(possibilitiesAlgorithm) {
    this.possibilitiesAlgorithm = possibilitiesAlgorithm;
  }
  /**
   * setPossibilitiesAlgorithm method
   * @param {ElectionAlgorithm} electionAlgorithm
   */
  setElectionAlgorithm(electionAlgorithm) {
    this.electionAlgorithm = electionAlgorithm;
  }

  /**
   * getBestQuotation method
   * @param {string} from
   * @param {string} to
   * @return {string}
   */
  getBestQuotation(from, to) {
    if (this.possibilitiesAlgorithm === null) {
      throw new Error(
          'There is no possibilities algorithm to get possibilities.'
      );
    }

    if (this.electionAlgorithm === null) {
      throw new Error('There is no election algorithm to get elected route.');
    }

    const routes = this.repository.getAllRoutes();

    this.possibilitiesAlgorithm.setAllRoutes(routes);
    this.possibilitiesAlgorithm.setFirstPoint(from);
    this.possibilitiesAlgorithm.setLastPoint(to);

    const possibilities = this.possibilitiesAlgorithm.getPossibilities();

    this.electionAlgorithm.setPossibilities(possibilities);

    return this.electionAlgorithm.getElected();
  }
}
