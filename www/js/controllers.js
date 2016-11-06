angular.module('starter.controllers', [])
.controller('HomeCtrl', function($scope, ensoy)
{
	ensoy.productos().then(function(data)
	{
		$scope.productos = data;
	});
});