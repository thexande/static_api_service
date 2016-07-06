angular.module('static.controllers', [])

  .controller('rootController', function($scope, $http, $state){
    console.log("in root controller");

  })
  .controller('usersController', function($scope, $http, $state, staticFactory){
    $scope.users = staticFactory.getFromLocalStorage('users')
    // watch users in local storage to update
    $scope.$on("LocalStorageModule.notification.setitem", function (key, newVal, type) {
      // console.log("LocalStorageModule.notification.setitem", key, newVal, type);
      $scope.users = staticFactory.getFromLocalStorage('users')

    })
  })
  .controller('dashController', function($scope, $http, $state, staticFactory){
    staticFactory.getAllUsers().then((res) => {
        // insert data into local storage for retrevial in view
        staticFactory.setToLocalStorage('users', res.data)
      })
  })
  .controller('userController', function($scope, $http, $state, $log, $uibModal){
    console.log("in User controller");

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
      staticFactory.createNewUser({user_data: $scope.user})
        .then(function(resp){
          // user created. get list of all users and update in local storage
          staticFactory.getAllUsers().then(function(resp){
            // reset local storage
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
  $scope.user.active = 1;
  $scope.size = 'large';
  $scope.animate = true;
  $scope.radioOff = true;
  $scope.handleWidth = "auto";
  $scope.labelWidth = "auto";
  $scope.inverse = false;
})
// modal controller for adding a editing user
.controller('ModalUserEditCtrl', function($scope, $uibModal, $log, staticFactory){
  $scope.animationsEnabled = true;
  $scope.open = function (user) {
    // set current editing user in local storage
    staticFactory.setToLocalStorage('user_edit', user)
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'build/edit.html',
      controller: 'UserEditInstanceCtrl',
      size: 'lg'
    })
  }
})
.controller('UserEditInstanceCtrl', function($scope, $uibModalInstance, $log, staticFactory){
  // form update to edit a user
  $scope.user = staticFactory.getFromLocalStorage('user_edit')
  // method to update user in DB
  $scope.updateUser = function(isValid){
    if(isValid){
      staticFactory.updateExistingUser($scope.user)
      .then((res) => {
        // user updated. get list of all users and update in local storage
        staticFactory.getAllUsers().then(function(resp){
          // reset local storage
          console.log(resp.data);
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
  $scope.size = 'large';
  $scope.animate = true;
  $scope.radioOff = true;
  $scope.handleWidth = "auto";
  $scope.labelWidth = "auto";
  $scope.inverse = false;
})
