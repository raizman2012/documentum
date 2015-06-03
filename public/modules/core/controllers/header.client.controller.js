'use strict';

angular.module('core').controller('HeaderController', ['$cookies', '$cookieStore', '$scope',  '$translate', 'Menus',
	function($cookies, $cookieStore, $scope, $translate, Menus) {
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});

		console.log($cookies);
		if ($cookies['language'] === undefined) {
			$cookies['language'] =  'english';
		}
		$scope.language  = $cookies['language'];
		$translate.use($scope.language);


		$scope.toogleHebrewEnglish = function()  {

			if ($scope.language === 'hebrew') {
				$scope.language = 'english';

			} else {
				$scope.language = 'hebrew';

			}

			$cookies["language"] = $scope.language;

			window.location.reload();
		}
	}
]);