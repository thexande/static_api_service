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
      }
    }
  })
