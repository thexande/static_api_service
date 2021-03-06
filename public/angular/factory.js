angular.module('static.services', [])
  .factory('staticFactory', ($http, localStorageService) => {
    return{
      // local storage methods
      getFromLocalStorage: (key) => {
        return localStorageService.get(key)
      },
      setToLocalStorage: (key, value) => {
        return localStorageService.set(key, value)
      },
      getAllUsers: () => {
        return $http.get('/userList')
      },
      createNewUser: (user) => {
        return $http({
          method: "POST",
          url: "/userList",
          data: user
        })
      },
      updateExistingUser: (user) => {
        return $http({
          method: "PATCH",
          url: "/userList",
          data: user
        })
      },
      deleteUser: (user) => {
        return $http({
          method: "DELETE",
          url: "/user/" + user._id
        })
      }
    }
  })
