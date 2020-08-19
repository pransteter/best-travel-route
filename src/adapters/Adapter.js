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
    this.target = '';
  }

  /**
   * setTarget method
   * @param {string} target
   * @return {self}
   */
  setTarget(target) {
    this.target = target;
    return this;
  }

  /**
   * fetchAll method
   * @return {array}
   */
  fetchAll() {
    return this.executeFetchAll();
  }

  /**
   * save method
   * @param {*} data
   * @return {boolean}
   */
  save(data) {
    return this.executeSave(data);
  }
}
