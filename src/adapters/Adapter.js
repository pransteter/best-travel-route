/**
 * Adapter class
 */
export class Adapter {
  /**
   * constructor method
   * @param {string} origin
   */
  constructor(origin) {
    this.origin = origin;
    this.fromClausule = '';
  }
  /**
   * from method
   * @param {string} place
   * @return {self}
   */
  from(place) {
    this.fromClausule = place;
    return this;
  }

  /**
   * fetchAll method
   * @return {array}
   */
  fetchAll() {
    return this.execute();
  }
}
