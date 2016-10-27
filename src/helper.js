'use strict';

import {isNumber, numberCompare, generalCompare} from './util.js';

/**
 * Style define.
 * @type {{increase: string, decrease: string}}
 */
const Style = {
    increase: 'increase',
    decrease: 'decrease'
};

/**
 * make all table sortable
 */
export function defineSortableAll() {
    $('table').each((item, element) => {
        const $element = $(element);
        defineSortable($element.children('thead'), $element.children('tbody'));
    });
}

/**
 * make one table sortable
 * @param $tableHead {Object}
 * @param $tableBody {Array<Object>}
 */
export function defineSortable($tableHead, $tableBody) {
    $tableHead.click(e => {
        const $columnTitle = $(e.target);
        toggleIncreaseClass($columnTitle);
        $tableBody.children('tr')
            .sort(compareFactory($columnTitle.index(), isIncreasing($columnTitle)))
            .appendTo($tableBody);
    });
}

/**
 * make the increase style toggleable.
 * @param $columnTitle
 */
function toggleIncreaseClass($columnTitle) {
    $columnTitle.addClass(Style.decrease)
        .toggleClass(Style.increase)
        .siblings()
        .removeClass(Style.increase + ' ' + Style.decrease);
}

/**
 * create a compare function
 * @param column {number}
 * @param isIncreasing
 * @return {function(*=, *=)}
 */
function compareFactory(column, isIncreasing) {
    const getTextContent = row => $($(row).children('td')[column]).text();
    return (left, right) => {
        let result = [left, right]
            .map(getTextContent)
            .reduce(areBothNumber(left, right) ? numberCompare : generalCompare);
        return isIncreasing ? result : 0 - result;
    };
}

/**
 * check the state if it is increasing.
 * @param $columnTitle
 * @return {boolean|*}
 */
function isIncreasing($columnTitle) {
    return $columnTitle.hasClass(Style.increase);
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
