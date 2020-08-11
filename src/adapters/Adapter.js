/**
 * Adapter class
 */
export class Adapter {
  /**
   * select method
   * @param {array} columns
   * @return {self}
   */
  select(columns) {
    return this;
  }

  /**
   * from method
   * @param {string} place
   * @return {self}
   */
  from(place) {
    return this;
  }

  /**
   * fetchAll method
   * @return {array}
   */
  fetchAll() {
    return this.execute();
  }

  /**
   * execute method
   * @return {array}
   */
  execute() {
    return [];
  }
}
