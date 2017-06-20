angular.module('ngApp', [])
.controller('appCtrl', ($scope) => {
  this.submit = () => {

  };
  $scope.currentNpcs = [{name: 'Grog', class: 'Barbarian', race: 'Human', level: '3', hp: 36, description: 'he\'s a man', skills: ['Rage', 'Unarmored Defense', 'Reckless Attack', 'Danger Sense', 'Primal Path']}];
  this.getCurrentNpcs = () => {

  };
})

.directive('appContainer', () => {
  return {
    controller: 'appCtrl',
    controllerAs: 'ctrl',
    bindToController: true,
    template: `
    <div ng-controller="appCtrl as app">
      <app npcs="currentNpcs"></app>
    </div>`    
  }
})

.directive('app', () => {
  return {
    scope: {
      npcs: '<'
    },
    controller: 'appCtrl',
    controllerAs: 'ctrl',
    bindToController: true,
    template: 
    `<div>
      Hello from our directive
    </div>
    <npc-list n="np"
    ng-repeat="np in ctrl.npcs track by $index"
    >
    </npc-list>`
  };

})

.directive('npcList', () => {
  return {
    scope: {
      n: '<'
    },
    controller: 'appCtrl',    
    controllerAs: 'ctrl',
    bindToController: true,
    template: 
    `<div class='npccontainer'>
      <div class="name">Name: {{ctrl.n.name}}</div>
      <div class="class">Class: {{ctrl.n.class}}</div>
      <div class="race">Race: {{ctrl.n.race}}</div>
      <div class="level">Level: {{ctrl.n.level}}</div>
      <div class="hp">HP: {{ctrl.n.hp}}</div>
      <div class="description">Description: {{ctrl.n.description}}</div>
      <div class="skills">Skills: {{ctrl.n.skills}}</div>
    </div>`
  }
})












