import {PossibilitiesAlgorithm} from './PossibilitiesAlgorithm';

/**
 * KeepLastPointPossibilitiesAlgorithm class
 */
export class KeepLastPointPossibilitiesAlgorithm
  extends PossibilitiesAlgorithm {
  /**
   * constructor method
   */
  constructor() {
    super();
    this.firstPoint = '';
    this.lastPoint = '';
  }

  /**
   * setFromPoint method
   * @param {string} firstPoint
   */
  setFirstPoint(firstPoint) {
    this.firstPoint = firstPoint;
  }

  /**
   * setFromPoint method
   * @param {string} lastPoint
   */
  setLastPoint(lastPoint) {
    this.lastPoint = lastPoint;
  }

  /**
   * generatePossibilities method
   */
  generatePossibilities() {
    // algorithm starts here...
    this.possibilities = {};
  }
}
