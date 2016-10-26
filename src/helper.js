'use strict';

import {isNumber, numberCompare, generalCompare} from './util.js';
const Style = {
    increase: 'increase',
    decrease: 'decrease'
};

export function defineSortableAll() {
    $('table').each((item, element) => {
        const $element = $(element);
        defineSortable($element.children('thead'), $element.children('tbody'));
    });
}

export function defineSortable($tableHead, $tableBody) {
    $tableHead.click(e => {
        const $columnTitle = $(e.target);
        toggleDecreaseClass($columnTitle);
        const isIncreasing = $columnTitle.hasClass(Style.increase);
        $tableBody.children('tr')
            .sort(compareFactory($columnTitle.index(), isIncreasing))
            .appendTo($tableBody);
    });
}

function toggleDecreaseClass($columnTitle) {
    $columnTitle.addClass(Style.decrease)
        .toggleClass(Style.increase)
        .siblings()
        .removeClass(Style.increase + ' ' + Style.decrease);
}

function compareFactory(column, isIncreasing) {
    const getTextContent = row => $($(row).children('td')[column]).text();
    return (left, right) => {
        left = getTextContent(left);
        right = getTextContent(right);
        let result = isNumber(left) && isNumber(right) ? numberCompare(left, right) : generalCompare(left, right);
        return isIncreasing ? result : 0 - result;
    };
}
