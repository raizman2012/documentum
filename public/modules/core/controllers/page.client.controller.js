'use strict';

angular.module('core').controller('PageController', ['$cookies', '$cookieStore', '$scope',
	function($cookies, $cookieStore, $scope) {
		$scope.currentStep = 0;
	}
]);