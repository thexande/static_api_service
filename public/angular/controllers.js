angular.module('static.controllers', [])
  .controller('usersController', function($scope, $http, $state, staticFactory){
    $scope.users = (staticFactory.getFromLocalStorage('users'))
    console.log($scope.users);
  })
  .controller('dashController', function($scope, $http, $state, staticFactory){
    console.log("in dash controller");
    $http.get('/userList')
      .then((res) => {
        staticFactory.setToLocalStorage('users', res.data)
        console.log(res)
        // $scope.users = res.data
      })
  })
  .controller('userController', function($scope, $http, $state){
    console.log("in User controller");
  })
  .controller('rootController', function($scope, $http, $state){
    console.log("in root controller");

  })
