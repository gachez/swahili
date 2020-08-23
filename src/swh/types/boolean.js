const util = require('util');
const colors = require('colors');
const SWValue = require('./value');
const { RTError } = require('../error');

/**  Boolean data type */
class SWBoolean extends SWValue {
  /**
   * instantiates a boolean
   * @param {Boolean} value value to set
   */
  constructor(value) {
    super();
    this.value = value;
  }

  /**
   * logically compares two booleans and returns true if the booleans are equal
   * @param {SWBoolean} other boolean to be compared to the current
   * @returns {SWBoolean}
   */
  getComparisonEQ(other) {
    if (other instanceof SWBoolean) {
      return [
        new SWBoolean(this.value === other.value).setContext(this.context),
        null,
      ];
    } else {
      return [null, super.illegalOperation(other)];
    }
  }

  /**
   * logically compares two booleans and returns true if the booleans are not equal
   * @param {SWBoolean} other boolean to be compared to the current
   * @returns {SWBoolean}
   */
  getComparisonNE(other) {
    if (other instanceof SWBoolean) {
      return [
        new SWBoolean(this.value !== other.value).setContext(this.context),
        null,
      ];
    } else {
      return [null, super.illegalOperation(other)];
    }
  }

  /**
   * logically compares two booleans and returns true if the booleans are truthy
   * @param {SWBoolean} other boolean to be compared to the current
   * @returns {SWBoolean}
   */
  andedBy(other) {
    if (other instanceof SWBoolean) {
      return [
        new SWBoolean(this.value && other.value).setContext(this.context),
        null,
      ];
    } else {
      return [null, super.illegalOperation(other)];
    }
  }

  /**
   * logically compares two booleans and returns true if one of the booleans is truthy
   * @param {SWBoolean} other boolean to be compared to the current
   * @returns {SWBoolean}
   */
  oredBy(other) {
    if (other instanceof SWBoolean) {
      return [
        new SWBoolean(this.value || other.value).setContext(this.context),
        null,
      ];
    } else {
      return [null, super.illegalOperation(other)];
    }
  }

  /**
   * returns true if a value is falsy, and false if a value is truthy
   * @returns {SWBoolean}
   */
  notted() {
    return [new SWBoolean(!this.value).setContext(this.context), null];
  }

  /**
   * creates a new instance of the boolean
   * @returns {SWBoolean}
   */
  copy() {
    let copy = new SWBoolean(this.value);
    copy.setPosition(this.posStart, this.posEnd);
    copy.setContext(this.context);
    return copy;
  }

  /**
   * returns true if the boolean value is truthy
   * @returns {Boolean}
   */
  isTrue() {
    return this.value !== false;
  }

  [util.inspect.custom](depth, options) {
    return this.toString();
  }

  /**
   * string representation of the boolean class
   * @returns {String}
   */
  toString() {
    return `${colors.yellow(this.value ? 'kweli' : 'uwongo')}`;
  }
}

module.exports = SWBoolean;