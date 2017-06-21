angular.module('ngApp', [])

.controller('appCtrl', ($scope, $http) => {
  $scope.getSkills = (clas, level) => {
    $http({
      method: 'GET',
      url: `http://www.dnd5eapi.co/api/classes/${clas}/levels`,
    })
    .then((data) => {
      let ret = [];
      for (var i = 0; i < level; i++) {
        data.data[i].features.forEach((obj) => {
          ret.push(obj.name);
        });
      }
      $scope.skills = ret
    });
  };
  $scope.skills = [];
  $scope.hps = {barbarian: 12, bard: 8, cleric: 8, druid: 8, fighter: 10, monk: 8, paladin: 10, ranger: 10, rogue: 8, sorcerer: 6, warlock: 8};
  this.submit = () => {

  };
  $scope.currentNpcs = [];
  $scope.getCurrentNpcs = () => {
    console.log('test')
    $http.get('/npcs')
    .then((data) => {
      $scope.currentNpcs = data.data;
    })
  };
  $scope.getCurrentNpcs();

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
      npcs: '<',
    },
    controller: 'appCtrl',
    controllerAs: 'ctrl',
    bindToController: true,
    template: 
    `<h4>Your current NPC's</h4>
      <npc-list n="np"
      ng-repeat="np in ctrl.npcs track by $index"
      >
      </npc-list>
    <h4>Add an NPC?</h4>
    <add-npc></add-npc>
    `
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

.directive('addNpc', () => {
  return {

    controller: () => {
      this.skills = ['hello'];  
    },
    controllerAs: 'props',
    bindToController: true,
    template: `
    <div>
      <form action="/addclass" method="post">
        <button type="submit">Submit</button>
        <div>Name</div>
        <input type="text" name="name" value="">
        <select name="class" ng-model="data.class" ng-init="data.class='barbarian'">
          <option value="barbarian">Barbarian</option>
          <option value="bard">Bard</option>
          <option value="cleric">Cleric</option>
          <option value="druid">Druid</option>
          <option value="fighter">Fighter</option>
          <option value="monk">Monk</option>
          <option value="paladin">Paladin</option>
          <option value="ranger">Ranger</option>
          <option value="rogue">Rogue</option>
          <option value="sorcerer">Sorcerer</option>
          <option value="warlock">Warlock</option>
        </select>
        <select name="race">
          <option value="dwarf">Dwarf</option>
          <option value="elf">Elf</option>
          <option value="halfling">Halfling</option>
          <option value="human">Human</option>
        </select>
        <select name="level" ng-model="data.level" ng-init="data.level='1'">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
          <option value="16">16</option>
          <option value="17">17</option>
          <option value="18">18</option>
          <option value="19">19</option>
          <option value="20">20</option>
        </select>
        <div>Hp will be calculated automatically</div>
        <input type="text" name="hp" value={{hps[data.class]*data.level}}>
        <div>Description of NPC</div>
        <textarea name="description" rows="4" cols="50"></textarea>
        <div></div>
        <button type="button" ng-click="getSkills(data.class, data.level)">Populate skills</button>
        <ol ng-init="skills=[]">
          <li ng-repeat="skill in skills">{{skill}}</li>
        </ol>
        <input type="text" value={{skills}} style="display:none" name="skills">
      </form>
    </div>`
  }
})







