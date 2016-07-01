var static = angular.module('static',
  ['static.controllers', 'static.services', 'ui.router'])
static.config(($stateProvider, $urlRouterProvider) => {
  $stateProvider
    .state('root', {
      url: '/',
      templateUrl: "build/root.html"
    });
})
