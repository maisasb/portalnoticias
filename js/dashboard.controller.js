app.controller('dashboardController', function($scope, $http, $window){

    if ($window.sessionStorage.token == null || $window.sessionStorage.token == undefined){
        window.location = "index.html"
    }
	
    
});




