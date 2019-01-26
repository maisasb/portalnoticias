var app = angular.module('app', ['ngSanitize'], function($locationProvider){
	$locationProvider.html5Mode({
	  enabled: true,
	  requireBase: false
	});
});