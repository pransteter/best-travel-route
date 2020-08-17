/**
 * ElectionAlgorithm class
 */
export class ElectionAlgorithm {
  /**
   * constructor method
   */
  constructor() {
    this.possibilities = [];
    this.elected = [];
    this.price = 0;
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
    return {
      route: this.elected,
      price: this.price,
    };
  }
}
