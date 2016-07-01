angular.module('static.services', [])
  .factory('staticFactory', ($http, localStorageService) => {
    return{
            // local storage methods
      getFromLocalStorage: (key) => {
        return localStorageService.get(key)
      },
      setToLocalStorage: (key, value) => {
        return localStorageService.set(key, value)
      }
    }
  })
