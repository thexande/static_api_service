angular.module('static.controllers', [])

  .controller('rootController', function($scope, $http, $state){
    console.log("in root controller");

  })
  .controller('usersController', function($scope, $http, $state, staticFactory){
    $scope.users = (staticFactory.getFromLocalStorage('users'))
    console.log($scope.users);
  })
  .controller('dashController', function($scope, $http, $state, staticFactory){
    console.log("in dash controller");
    $http.get('/userList')
      .then((res) => {
        console.log("data here");
        console.log(res.data[0].users);
        staticFactory.setToLocalStorage('users', res.data[0].users)
        console.log(res)
        // $scope.users = res.data
      })
  })
  .controller('userController', function($scope, $http, $state, $log, $uibModal){
    console.log("in User controller");

  })

  // modal testing
  .controller('ModalDemoCtrl', function ($scope, $uibModal, $log) {

  $scope.items = ['item1', 'item2', 'item3'];

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
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };



})
.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, $log, $http) {
  // form update to create new user
  $scope.user = {}
  $scope.createNewUser = function(isValid) {
    console.log("woot");
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

  $scope.$watch('isSelected', function() {
    $log.info('Selection changed.');
  });

  $scope.toggle = function() {
    $scope.isSelected = $scope.isSelected === 'yep' ? 'nope' : 'yep';
  };

  $scope.setUndefined = function() {
    $scope.isSelected = undefined;
  };

  $scope.toggleActivation = function() {
    $scope.isActive = !$scope.isActive;
  }


});
