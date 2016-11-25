angular.module('starter.services', [])
.factory('$ensoy', function ($http) {
    return {
        productos: function () {
            return $http.get('database/productos.json').then(function (response) {
                return response.data;
            });
        }
    }
})
.factory('$plan', function(){
	return {
		id_producto: 0,
		id_presentacion: '',
		numero_tomas_dia: '',
		numero_meses: ''
	}
	/*
	return {
		getPlan: function()
		{
			return plan;
		},
		setPlan: function(nuevoplan)
		{
			plan = nuevoplan;
		},
		resetPlan: function()
		{
			plan = {
				id_producto: 0,
				id_presentacion: '',
				numero_tomas_dia: '',
				numero_meses: ''
			};
		}
	}*/
});