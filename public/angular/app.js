var static = angular.module('static',
  ['static.controllers', 'static.services', 'ui.router'])
static.config(($stateProvider, $urlRouterProvider) => {
  // $urlRouterProvider.otherwise('/dash')
  $stateProvider
    .state('root', {
      url: '/',
      templateUrl: 'build/root.html'
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
      templateUrl: 'build/user.html'
      // controller: 'userController'
    });
})
