let angular = require('angular');


module.exports = angular.module('ngApp', [])
.controller('appCtrl', function () {
  this.submit


})

.directive('ngApp', function () {
  return {
    controllerAs: 'ctrl',
    bindToController: true,
    contrtoller: 'appCtrl',
    template: `<div>Hello from our directive</div>`
  }

});


