angular.module('ngApp', [])
.controller('appCtrl', function () {
  this.submit


})

.directive('app', function () {
  return {
    controllerAs: 'ctrl',
    bindToController: true,
    contrtoller: 'appCtrl',
    template: `<div ng-controller="appCtrl">Hello from our directive</div>`
  };

});


