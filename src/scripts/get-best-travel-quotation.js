import {TravelQuotation} from '../contexts/travel-quotation/TravelQuotation.js';
import {TravelRouteRepository} from '../repositories/TravelRouteRepository.js';
import {CsvAdapter} from '../adapters/CsvAdapter.js';
import {KeepLastPointPossibilitiesAlgorithm}
  // eslint-disable-next-line max-len
  from '../contexts/travel-quotation/algorithms/KeepLastPointPossibilitiesAlgorithm.js';
import {BestPriceElectionAlgorithm}
  from '../contexts/travel-quotation/algorithms/BestPriceElectionAlgorithm.js';

if (
  !process.env.npm_config_routeForCheck ||
  typeof process.env.npm_config_routeForCheck !== 'string'
) {
  console.error('You need to pass the route like a string. Example: "GRU-BRC"');
  process.exit();
}

const routeParts = process.env.npm_config_routeForCheck.split('-');

if (!routeParts[1] || routeParts[2]) {
  console.error('You need to pass the route like this: "GRU-BRC"');
  process.exit();
}

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

const result = context.getBestQuotation(
    routeParts[0].toUpperCase(),
    routeParts[1].toUpperCase(),
);

if (!result.route || !result.route[0]) {
  console.error('Any route was found.');
  process.exit();
}

let routeInSingleLine = '';

for (let i = 0; i < result.route.length; i++) {
  const routeStretch = result.route[0];

  routeInSingleLine += (i === 0) ?
    `${routeStretch.from} - ${routeStretch.to}` :
    ` - ${routeStretch.to}`;
}

console.log('best route:', routeInSingleLine, '>', result.price);
process.exit();
