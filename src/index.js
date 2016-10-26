'use strict';

import $ from 'jquery';
import {defineSortable, defineSortableAll} from './helper.js';

module.exports = function Sorter(selector) {
    if (typeof selector === 'undefined') {
        defineSortableAll();
    } else if (typeof selector === 'string') {
        const $element = $(selector);
        defineSortable($element.children('thead'), $element.children('tbody'));
    }
};