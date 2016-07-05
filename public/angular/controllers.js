angular.module('static.controllers', [])

  .controller('rootController', function($scope, $http, $state){
    console.log("in root controller");

  })
  .controller('usersController', function($scope, $http, $state, staticFactory){
    $scope.users = staticFactory.getFromLocalStorage('users')
    // watch users in local storage to update
    $scope.$on("LocalStorageModule.notification.setitem", function (key, newVal, type) {
      console.log("LocalStorageModule.notification.setitem", key, newVal, type);
      $scope.users = staticFactory.getFromLocalStorage('users')
      
    })
  })
  .controller('dashController', function($scope, $http, $state, staticFactory){
    staticFactory.getAllUsers()
      .then((res) => {
        // insert data into local storage for retrevial in view
        staticFactory.setToLocalStorage('users', res.data)
      })
  })
  .controller('userController', function($scope, $http, $state, $log, $uibModal){
    console.log("in User controller");

  })

  // modal testing
  .controller('ModalDemoCtrl', function ($scope, $uibModal, $log) {
  $scope.animationsEnabled = true;
  $scope.open = function (size) {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'build/user.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    })
  }
})
// modal controller for adding a new user
.controller('ModalUserCreateCtrl', function($scope, $uibModal, $log){
  $scope.animationsEnabled = true;
  $scope.open = function () {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'build/user.html',
      controller: 'UserCreateInstanceCtrl',
      size: 'lg'
    })
  }
})
.controller('UserCreateInstanceCtrl', function($scope, $uibModalInstance, $log, staticFactory){
  // form update to create new user
  $scope.user = {}
  $scope.createNewUser = function(isValid) {
    if(isValid){
      staticFactory.createNewUser({user_data:$scope.user})
        .then(function(resp){
          // user created. get list of all users and update in local storage
          staticFactory.getAllUsers().then(function(resp){
            // reset local storage and
            staticFactory.setToLocalStorage('users', resp.data)
          }).then(() => {
            $scope.cancel()
          })
        })
    }
  }
  // modal dismiss
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  }
  // bootstrap switch
  $scope.isSelected = 'yep';
  $scope.onText = 'Enabled';
  $scope.offText = 'Disabled';
  $scope.onColor = 'info'
  $scope.offColor = 'danger'
  $scope.user.is_active = 1;
  $scope.size = 'large';
  $scope.animate = true;
  $scope.radioOff = true;
  $scope.handleWidth = "auto";
  $scope.labelWidth = "auto";
  $scope.inverse = false;
})

.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, $log, $http) {
  // form update to create new user
  $scope.user = {}
  $scope.createNewUser = function(isValid) {
    console.log("woot");
    console.log($scope.user);
    if(!isValid){
      alert("invalid")
    }

    // $scope.user = angular.copy(user)
    // lets post and create our new user
    // $http({
    //   method: "POST",
    //   url: "/userList",
    //   data: $scope.user
    // }).then(function(resp){
    //   console.log(resp);
    // })
  }
  //
  // $scope.ok = function (user) {
  //   console.log(user);
  //   $scope.updateNewUser(user)
  //   console.log($scope.user);
  // };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
  // bootstrap switch
  $scope.isSelected = 'yep';
  $scope.onText = 'Enabled';
  $scope.offText = 'Disabled';
  $scope.onColor = 'info'
  $scope.offColor = 'danger'
  $scope.user.is_active = 1;
  $scope.size = 'large';
  $scope.animate = true;
  $scope.radioOff = true;
  $scope.handleWidth = "auto";
  $scope.labelWidth = "auto";
  $scope.inverse = false;
});
