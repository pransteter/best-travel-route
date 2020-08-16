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
    this.incompletePossibilities = [];
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
   * @return {Promise<void>}
   */
  async generatePossibilities() {
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

    if (
      firstPossibilities.scale.length <= 0 &&
      firstPossibilities.direct.length > 0
    ) {
      return;
    }

    const streams = this.createStreamsToGetAllScalePossibilities(
        firstPossibilities.scale
    );

    await Promise.all(streams);
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
   * createStreamsToGetAllScalePossibilities method
   * @param {array} scalePossibilities
   * @return {array}
   */
  createStreamsToGetAllScalePossibilities(scalePossibilities) {
    const streams = [];

    for (let index = 0; index < scalePossibilities.length; index++) {
      const possibility = scalePossibilities[index];
      streams.push(new Promise((resolve) => {
        this.generateScalePossibilitiesRecursively(possibility, index);
        resolve();
      }));
    }

    return streams;
  }

  /**
   * generateScalePossibilitiesRecursively method
   * @param {array} scalePossibilities
   * @param {number} streamId
   * @return {void}
   */
  generateScalePossibilitiesRecursively(
      scalePossibilities,
      streamId
  ) {
    for (const route of scalePossibilities) {
      const firstPossibilities = this.generateFirstPossibilities(
          this.firstPoint,
          route.from
      );

      this.attachDirectRoutes(route, firstPossibilities.direct, streamId);

      if (firstPossibilities.scale.length > 0) {
        this.attachIncompleteRoutes(route, streamId);
        this.generateScalePossibilitiesRecursively(
            firstPossibilities.scale,
            streamId
        );
      }
    }
  }

  /**
   * attachDirectRoutes method
   * @param {object} currentRoute
   * @param {array} directRoutes
   * @param {number} incompleteStreamIndex
   */
  attachDirectRoutes(currentRoute, directRoutes, incompleteStreamIndex) {
    if (directRoutes.length <= 0) {
      return;
    }

    const pastRoutes = this.incompletePossibilities[incompleteStreamIndex] || [];
    pastRoutes.push(currentRoute);
    const possibilitiesToIncrement = pastRoutes.concat(directRoutes);

    this.possibilities.push(possibilitiesToIncrement);
  }

  /**
   * attachScaleRoutes method
   * @param {object} currentRoute
   * @param {array} streamIndex
   */
  attachIncompleteRoutes(currentRoute, streamIndex) {
    if (!this.incompletePossibilities[streamIndex]) {
      this.possibilities[streamIndex] = [currentRoute];
      return;
    }

    this.possibilities[
        streamIndex
    ].push(currentRoute);
  }
}
