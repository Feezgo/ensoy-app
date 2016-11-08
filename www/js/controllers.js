angular.module('starter.controllers', [])
.controller('HomeCtrl', function($scope)
{
	
})
.controller('ProductosCtrl', function($scope, $ensoy, $location)
{
	$ensoy.productos().then(function(data)
	{
		$scope.productos = data;
	});

	$scope.go = function (path) {
		$location.path(path);
	};
})
.controller('DetallesCtrl', function($scope, $ensoy, $stateParams, $filter)
{
	$ensoy.productos().then(function(data)
	{
		producto = $filter('filter')(data, function(o)
		{
			return o.id == $stateParams.id;
		})[0];

		$scope.producto = producto;
	});
});