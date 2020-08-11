/**
 * ElectionAlgorithm class
 */
export class ElectionAlgorithm {
  /**
   * constructor method
   */
  constructor() {
    this.possibilities = [];
    this.elected = '';
  }

  /**
   * setPossibilities method
   * @param {array} possibilities
   */
  setPossibilities(possibilities) {
    this.possibilities = possibilities;
  }

  /**
   * electOne method
   */
  electOne() {
    // needs to be implemented within children classes
  }

  /**
   * getElected method
   * @return {string}
   */
  getElected() {
    this.electOne();
    return this.elected;
  }
}
