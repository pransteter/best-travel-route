import {Adapter} from './Adapter.js';
import * as fs from 'fs';

/**
 * Adapter class
 */
export class CsvAdapter extends Adapter {
  /**
   * executeFetchAll method
   * @return {array}
   */
  executeFetchAll() {
    let data = [];

    const wholeData = fs.readFileSync(
        `${this.origin}${this.target}`,
        'utf8',
        (err, data) => err ? '' : data,
    );

    data = wholeData.split(/\r?\n/);

    return data;
  }

  /**
   * executeSave method
   * @param {string} route
   * @return {boolean}
   */
  executeSave(route) {
    fs.appendFileSync(
        `${this.origin}${this.target}`,
        `\r\n${route}`,
        'utf8',
    );

    return true;
  }
}
