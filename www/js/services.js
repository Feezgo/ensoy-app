angular.module('starter.services', [])
.factory('ensoy', function ($http) {
    return {
        productos: function () {
            return $http.get('database/productos.json').then(function (response) {
                return response.data;
            });
        }
    }
})