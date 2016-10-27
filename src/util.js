'use strict';

/**
 * number compare
 * @param leftNumber
 * @param rightNumber
 * @return {number}
 */
export function numberCompare(leftNumber, rightNumber) {
    return leftNumber - rightNumber;
}

/**
 * general compare
 * @param left
 * @param right
 * @return {number}
 */
export function generalCompare(left, right) {
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
export function isNumber(text) {
    return /^\d+(\.\d+)?$/.test(text.trim());
}