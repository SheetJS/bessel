/* bessel.js (C) 2013-present SheetJS -- http://sheetjs.com */
/* vim: set ts=2: */
/*exported BESSEL */
var BESSEL;
/*:: declare var DO_NOT_EXPORT_BESSEL: any; */
/*:: declare var define: any; */
(function (factory) {
  /*jshint ignore:start */
  if(typeof DO_NOT_EXPORT_BESSEL === 'undefined') {
    if('object' === typeof exports) {
      factory(exports);
    } else if ('function' === typeof define && define.amd) {
      define(function () {
        var module = {};
        factory(module);
        return module;
      });
    } else {
      factory(BESSEL = {});
    }
  } else {
    factory(BESSEL = {});
  }
  /*jshint ignore:end */
}(function(BESSEL) {
