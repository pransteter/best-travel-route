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
    this.scalePossibilities = [];
    this.currentPossibilityIndex = 0;
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
    const firstPossibilities = this.generateFirstPossibilities(
        this.firstPoint,
        this.lastPoint
    );

    if (
      firstPossibilities.scale.length <= 0 &&
      firstPossibilities.direct.length <= 0
    ) {
      return;
    }

    this.possibilities = firstPossibilities.direct;
    console.log(this.possibilities);
    if (
      firstPossibilities.scale.length <= 0 &&
      firstPossibilities.direct.length > 0
    ) {
      return;
    }

    this.currentPossibilityIndex = this.possibilities.length + 1;
    this.scalePossibilities = firstPossibilities.scale;

    this.generateScalePossibilitiesRecursively();
  }

  /**
   * generateFirstPossibilities
   * @param {string} origin
   * @param {string} destiny
   * @return {object}
   */
  generateFirstPossibilities(origin, destiny) {
    const result = {
      'direct': [],
      'scale': [],
    };

    for (const route of this.routes) {
      if (destiny === route.to) {
        const possibilityType = (origin === route.from) ?
          'direct' :
          'scale';

        result[possibilityType].push(route);
      }
    }

    return result;
  }

  /**
   * generateScalePossibilitiesRecursively method
   * @param {array} scalePossibilities
   * @param {number} possibilityIndex
   * @return {void}
   */
  generateScalePossibilitiesRecursively(scalePossibilities) {
    const possibilities = scalePossibilities || this.scalePossibilities;

    for (const route of possibilities) {
      const firstPossibilities = this.generateFirstPossibilities(
          this.firstPoint,
          route.from
      );

      this.attachDirectRoutes(route, firstPossibilities.direct);

      if (firstPossibilities.scale.length > 0) {
        this.attachIncompleteRoutes(route);
        this.generateScalePossibilitiesRecursively(
            firstPossibilities.scale
        );
      }
    }
  }

  /**
   *
   * @param {object} currentRoute
   * @param {array} directRoutes
   * @param {number} possibilityIndex
   */
  attachDirectRoutes(currentRoute, directRoutes) {
    if (directRoutes.length <= 0) {
      return;
    }

    const possibilitiesToIncrement = [currentRoute].concat(directRoutes);

    if (this.possibilities[this.currentPossibilityIndex]) {
      this.possibilities[
          this.currentPossibilityIndex
      ] = this.possibilities[this.currentPossibilityIndex]
          .concat(
              possibilitiesToIncrement
          );
      return;
    }

    this.possibilities[this.currentPossibilityIndex] = possibilitiesToIncrement;
    this.currentPossibilityIndex += 1;
  }

  /**
   * attachScaleRoutes method
   * @param {object} currentRoute
   * @param {array} scaleRoutes
   */
  attachIncompleteRoutes(currentRoute) {
    if (!this.possibilities[this.currentPossibilityIndex]) {
      this.possibilities[this.currentPossibilityIndex] = [currentRoute];
      return;
    }

    this.possibilities[
        this.currentPossibilityIndex
    ] = this.possibilities[this.currentPossibilityIndex]
        .concat([currentRoute]);
  }
}
