/*
*賓果卷controller
*/

var app = angular.module('myApp', []);

app.controller('mainController', function($scope) {
	
	$scope.numbers = [];

	for (var i = 1; i <= 25; i++) {
		$scope.numbers.push(i);
	}

	$scope.random = function() {
		return 0.5 - Math.random();
	};

});