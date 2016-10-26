'use strict';


export function numberCompare(leftNumber, rightNumber) {
    return leftNumber - rightNumber;
}

export function generalCompare(left, right) {
    if (left < right) {
        return -1;
    } else if (left > right) {
        return 1;
    } else {
        return 0;
    }
}

export function isNumber(text) {
    return /^\d+(\.\d+)?$/.test(text.trim());
}