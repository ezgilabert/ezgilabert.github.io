/**
 * dom.js
 * Small helpers for querying and updating the DOM.
 */

const $  = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

const on = (el, event, handler, opts) => el && el.addEventListener(event, handler, opts);

window.DOM = { $, $$, on };