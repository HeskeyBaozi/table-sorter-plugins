'use strict';

import $ from 'jquery';

const Style = {
    increase: 'increase',
    decrease: 'decrease'
};

$('table').each((item, element) => {
    sortablefy($(element));
});

function sortablefy($table) {
    $table.children('thead').click(e => {
        const $tdOfThead = $(e.target);
        $tdOfThead.addClass(Style.decrease)
            .toggleClass(Style.increase)
            .siblings()
            .removeClass(Style.increase + ' ' + Style.decrease);
        const isIncreasing = $tdOfThead.hasClass(Style.increase);
        const $trows = $table.children('tbody').children('tr');
        $trows.sort(compareFactory($tdOfThead.index(), isIncreasing))
            .replaceAll('tbody tr');

    });
}

function compareFactory(column, isIncreasing) {
    const getTextContent = row => {
        const text = $($(row).children('td')[column]).text();
        return isNumber(text) ? parseFloat(text) : text;
    };
    return (left, right) => (isIncreasing
        ? getTextContent(left) > getTextContent(right)
        : getTextContent(left) < getTextContent(right));
}

function isNumber(text) {
    return /\d+\.?\d*/.test(text);
}

