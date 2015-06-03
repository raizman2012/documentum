'use strict';


angular.module('core').controller('HomeController', ['$scope', 'selectable',
	function($scope, selectable) {
		// This provides Authentication context.
		//console.log(selectable);
		var foo = new selectable([0,1,2]);
		//console.log(foo.getSelectedIndex());

		$scope.hello = 'hello';
	}
]);