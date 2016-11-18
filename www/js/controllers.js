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
})
.controller('DetallesCtrl', function($scope, $ensoy, $plan, $stateParams, $filter, $location)
{
	$scope.plan = {
		id_producto: $stateParams.id,
		id_presentacion: '',
		numero_tomas_dia: '',
		numero_meses: ''
	};

	$scope.actualizarplan = function()
	{
		$plan.setPlan($scope.plan);
	};

	$scope.verplan = function () 
	{
		$location.path('/plan');
	};

	$ensoy.productos().then(function(data)
	{
		producto = $filter('filter')(data, function(o)
		{
			return o.id == $stateParams.id;
		})[0];

		$scope.producto = producto;
	});
})
.controller('PlanCtrl', function($scope, $ensoy, $plan, $filter)
{
	$scope.plan = $plan.getPlan();

	$ensoy.productos().then(function(data)
	{
		producto = $filter('filter')(data, function(o)
		{
			return o.id == $scope.plan.id_producto;
		})[0];

		$scope.producto = producto;
	});
});