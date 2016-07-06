var static = angular.module('static',
  ['static.controllers', 'static.services', 'ui.router', 'ngTable', 'LocalStorageModule','frapontillo.bootstrap-switch','ui.bootstrap'])
static.config(($stateProvider, $urlRouterProvider) => {
  // local storage config
static.config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('staticAPI')
    .setStorageType('localStorage')
    .setNotify(true, true)
})
  $urlRouterProvider.otherwise('/dash')
  $stateProvider
    .state('root', {
      url: '/',
      templateUrl: 'build/root.html',
      controller: 'rootController'
    })
    .state('dash', {
      url: '/dash',
      templateUrl: 'build/dash.html',
      controller: 'dashController'
    })
    .state('dash.users', {
      url: '/users',
      templateUrl: 'build/users.html',
      controller: 'usersController'
    })
    .state('dash.user', {
      url: '/user',
      templateUrl: 'build/user.html',
      controller: 'userController'
    });
})
