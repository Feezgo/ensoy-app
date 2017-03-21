angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope)
{
	
})
.controller('ProductosCtrl', function($scope, $ensoy, $plan, $location)
{
	$scope.plan = $plan;
	$scope.plan.id_producto = '';
	$scope.plan.id_presentacion = '';
	$scope.plan.numero_tomas_dia = '';
	$scope.plan.numero_meses = '';

	$ensoy.productos().then(function(data)
	{
		$scope.productos = data;
	});
})
.controller('DetallesCtrl', function($scope, $ensoy, $plan, $stateParams, $filter, $location, $ionicPopup, $ionicModal)
{
	$scope.plan = $plan;
	$scope.plan.id_producto = $stateParams.id;
	$scope.plan.id_presentacion = '';
	$scope.plan.numero_tomas_dia = '';
	$scope.plan.numero_meses = '';

	$scope.actualizarplan = function()
	{
		console.log('DetallesCtrl.actualizarplan', $scope.plan);
	};

	$ionicModal.fromTemplateUrl('image-modal.html', {
		scope: $scope,
		backdropClickToClose: true,
		animation: 'slide-in-up'
    }).then(function(modal) {
		$scope.modal = modal;
    });

    $scope.closeModal = function() {
		$scope.modal.hide();
    };

    $scope.$on('$destroy', function() {
		$scope.modal.remove();
    });

	$scope.$on('$ionicView.beforeLeave', function(){
    	ionic.trigger('resize', {target: window});
	});

	$scope.mostrarInformacionNutricional = function()
	{
		$scope.modal.show();
	}

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
	$ensoy.productos().then(function(data)
	{
		$scope.latas = 0;
		$scope.plan = $plan;
		console.log('PlanCtrl', $scope.plan);
		producto = $filter('filter')(data, function(o)
		{
			return o.id == $scope.plan.id_producto;
		})[0];

		presentacion = $filter('filter')(producto.presentaciones, function(o)
		{
			return o.id == $scope.plan.id_presentacion;
		})[0]

		$scope.latas = Math.ceil((($plan.numero_meses * 30) * $plan.numero_tomas_dia) / (presentacion.porciones ? presentacion.porciones : 1));
		$scope.producto = producto;
		$scope.presentacion = presentacion;
	});

	$scope.obtener = function() {
    	console.log($scope.modeloeps.codigo, $scope.modeloeps.eps)
	}
});