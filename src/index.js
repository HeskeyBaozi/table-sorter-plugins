'use strict';

import $ from 'jquery';

const Style = {
    increase: 'increase',
    decrease: 'decrease'
};

/**
 * Attach the event for every table elements.
 */
$('table').each((item, element) => {
    const $element = $(element);
    defineSortable($element.children('thead'), $element.children('tbody'));
});

function defineSortable($tableHead, $tableBody) {
    $tableHead.click(e => {
        const $columnTitle = $(e.target);
        toggleDecreaseClass($columnTitle);
        const isIncreasing = $columnTitle.hasClass(Style.increase);
        const $tableRows = $tableBody.children('tr').sort(compareFactory($columnTitle.index(), isIncreasing));
        $tableBody.append($tableRows);
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

function numberCompare(leftNumber, rightNumber) {
    return leftNumber - rightNumber;
}

function generalCompare(left, right) {
    if (left < right) {
        return -1;
    } else if (left > right) {
        return 1;
    } else {
        return 0;
    }
}

function isNumber(text) {
    return /\d+\.?\d*/.test(text);
}