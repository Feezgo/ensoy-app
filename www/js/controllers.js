angular.module('starter.controllers', [])
.controller('HomeCtrl', function($scope, $ensoy)
{
	$ensoy.productos().then(function(data)
	{
		$scope.productos = data;
	});
})
.controller('ProductoCtrl', function($scope, $ensoy, $stateParams, $filter)
{
	$ensoy.productos().then(function(data)
	{
		producto = $filter('filter')(data, function(o)
		{
			return o.id === $stateParams.id;
		})[0];
		$scope.producto = data;
	});
});