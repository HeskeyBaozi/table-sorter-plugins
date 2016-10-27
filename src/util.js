'use strict';

/**
 * number compare
 * @param leftNumber
 * @param rightNumber
 * @return {number}
 */
export function compare(leftNumber, rightNumber) {
    return areBothNumber(leftNumber, rightNumber)
        ? parseFloat(leftNumber) - parseFloat(rightNumber)
        : generalCompare(leftNumber, rightNumber);
}

/**
 * general compare
 * @param left
 * @param right
 * @return {number}
 */
function generalCompare(left, right) {
    if (left < right) {
        return -1;
    } else if (left > right) {
        return 1;
    } else {
        return 0;
    }
}

/**
 * check if it is number
 * @param text
 * @return {boolean}
 */
function isNumber(text) {
    return /^\d+(\.\d+)?$/.test(text.trim());
}

/**
 * check they are both number.
 * @param left
 * @param right
 * @return {boolean}
 */
function areBothNumber(left, right) {
    return isNumber(left) && isNumber(right);
}