import {PossibilitiesAlgorithm} from './PossibilitiesAlgorithm.js';

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
    this.incompleteScalePossibilities = [];
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
        this.lastPoint,
    );

    if (
      firstPossibilities.scale.length <= 0 &&
      firstPossibilities.direct.length <= 0
    ) {
      return;
    }

    const filteredList = this.removeDuplicatedPossibilitiesKeepingTheLast(
        firstPossibilities.direct,
    );

    this.possibilities.push(filteredList);

    if (
      firstPossibilities.scale.length <= 0 &&
      firstPossibilities.direct.length > 0
    ) {
      return;
    }

    const streams = this.createStreamsToGetAllScalePossibilities(
        firstPossibilities.scale,
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
        this.generateScalePossibilitiesRecursively([possibility], index);
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
      streamId,
  ) {
    for (const route of scalePossibilities) {
      const firstPossibilities = this.generateFirstPossibilities(
          this.firstPoint,
          route.from,
      );

      this.attachCompleteScaleRoutes(
          route,
          firstPossibilities.direct, streamId,
      );

      if (firstPossibilities.scale.length > 0) {
        this.attachIncompleteScaleRoutes(route, streamId);
        this.generateScalePossibilitiesRecursively(
            firstPossibilities.scale,
            streamId,
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
  attachCompleteScaleRoutes(currentRoute, directRoutes, incompleteStreamIndex) {
    if (directRoutes.length <= 0) {
      return;
    }

    const pastRoutes = this.incompleteScalePossibilities[
        incompleteStreamIndex
    ] || [];
    pastRoutes.push(currentRoute);
    const possibilitiesToIncrement = pastRoutes.concat(directRoutes);

    possibilitiesToIncrement.reverse();

    const filteredList = this.removeDuplicatedPossibilitiesKeepingTheLast(
        possibilitiesToIncrement,
    );

    this.possibilities.push(filteredList);
    delete this.incompleteScalePossibilities[incompleteStreamIndex];
  }

  /**
   * attachScaleRoutes method
   * @param {object} currentRoute
   * @param {array} streamIndex
   */
  attachIncompleteScaleRoutes(currentRoute, streamIndex) {
    if (!this.incompleteScalePossibilities[streamIndex]) {
      this.incompleteScalePossibilities[streamIndex] = [currentRoute];
      return;
    }

    this.incompleteScalePossibilities[
        streamIndex
    ].push(currentRoute);
  }

  /**
   * removeDuplicatedPossibilities method
   * @param {array} possibilities
   * @return {array}
   */
  removeDuplicatedPossibilitiesKeepingTheLast(possibilities) {
    return possibilities.filter(
        (possibility, index) => {
          const nextPossibility = possibilities[index + 1];

          if (!nextPossibility) {
            return true;
          }

          return !(
            possibility.from === nextPossibility.from &&
            possibility.to === nextPossibility.to
          );
        },
    );
  }
}
