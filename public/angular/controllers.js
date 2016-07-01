angular.module('static.controllers', [])
  .controller('usersController', function($scope, $http, $state){
    $http.get('/userList')
      .then((res) => {
        console.log(res)
      })
    console.log("in user controller");
  })
  .controller('dashController', function($scope, $http, $state){
    console.log("in dash controller");
  })
  .controller('rootController', function($scope, $http, $state){
    console.log("in root controller");
  })
