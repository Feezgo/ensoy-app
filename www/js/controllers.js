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
.controller('DetallesCtrl', function($scope, $ensoy, $plan, $stateParams, $filter, $location, $ionicPopup)
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
		var valido = true;
		for (var key in $scope.plan)
		{
			if($scope.plan[key] == '') valido = false;
		}

		if (!valido)
		{
			var alertPopup = $ionicPopup.alert({
		    	title: 'Alerta!',
		    	template: 'Debes seleccionar todas las opciones.'
		   	});
		} else {
			$location.path('/plan');
		}
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

		presentacion = $filter('filter')(producto.presentaciones, function(o)
		{
			return o.id == $scope.plan.id_presentacion;
		})[0]

		$scope.producto = producto;
		$scope.presentacion = presentacion;
	});
});