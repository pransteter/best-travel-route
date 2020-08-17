import {Adapter} from './Adapter.js';
import * as fs from 'fs';

/**
 * Adapter class
 */
export class CsvAdapter extends Adapter {
  /**
   * execute method
   * @return {array}
   */
  execute() {
    let data = [];

    const wholeData = fs.readFileSync(
        `${this.origin}${this.fromClausule}`,
        'utf8',
        (err, data) => err ? '' : data,
    );

    data = wholeData.split(/\r?\n/);

    return data;
  }
}
