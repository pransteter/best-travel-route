import {TravelQuotation}
  from '../../contexts/travel-quotation/TravelQuotation.js';
import {KeepLastPointPossibilitiesAlgorithm}
  // eslint-disable-next-line max-len
  from '../../contexts/travel-quotation/algorithms/KeepLastPointPossibilitiesAlgorithm.js';
import {BestPriceElectionAlgorithm}
  // eslint-disable-next-line max-len
  from '../../contexts/travel-quotation/algorithms/BestPriceElectionAlgorithm.js';
import {TravelRouteRepository}
  from '.././../repositories/TravelRouteRepository.js';
import {CsvAdapter} from '../../adapters/CsvAdapter.js';

/**
 * TravelQuotationController class
 */
export class TravelQuotationController {
  /**
   * getBestQuotation method
   * @param {Request} req
   * @param {Response} res
   * @param {URLSearchParams} urlParams
   */
  getBestQuotation(req, res, urlParams) {
    const from = urlParams.get('from');
    const to = urlParams.get('to');

    if (!from || !to) {
      res.writeHead(400, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({
        // eslint-disable-next-line max-len
        errorMessage: 'It\'s necessary set a valid params for "from" and "to" url parameter.',
      }));
    }

    const context = this.buildTravelContext();
    const result = context.getBestQuotation(from, to);

    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify({
      from,
      to,
      bestPrice: result.price,
      bestPriceRoute: result.route,
    }));
    return;
  }

  /**
   * buildTravelContext method
   * @return {TravelQuotation}
   */
  buildTravelContext() {
    const context = new TravelQuotation(
        new TravelRouteRepository(
            new CsvAdapter('database-files/'),
        ),
    );

    context.setPossibilitiesAlgorithm(
        new KeepLastPointPossibilitiesAlgorithm(),
    );

    context.setElectionAlgorithm(
        new BestPriceElectionAlgorithm(),
    );

    return context;
  }
}
