angular.module('static.services', [])
  .factory('staticFactory', ($http) => {
    return{
      test: "woot"
    }
  })
