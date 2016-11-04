angular.module('starter.services', [])
.factory('ensoy', function ($http) {
    return {
        database: function () {
            return $http.get('database/productos.json').then(function (response) {
                return response.data;
            });
        }
    }
})