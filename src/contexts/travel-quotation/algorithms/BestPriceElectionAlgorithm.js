import {ElectionAlgorithm} from './ElectionAlgorithm.js';

/**
 * BestPriceElectionAlgorithm class
 */
export class BestPriceElectionAlgorithm extends ElectionAlgorithm {
  /**
   * electOne method
   */
  electOne() {
    let bestPrice = null;
    let bestPricePossibility = [];

    for (const possibility of this.possibilities) {
      const sumOfAllRoutes = possibility.reduce(
          (previousPossibility, currentPossibility) => (
            {price: previousPossibility.price + currentPossibility.price}
          ),
      );

      if (bestPrice === null || sumOfAllRoutes.price < bestPrice) {
        bestPrice = sumOfAllRoutes.price;
        bestPricePossibility = possibility;
      }
    }

    this.elected = bestPricePossibility;
    this.price = bestPrice;
  }
}
