angular.module('app').component('header', {
	  
	templateUrl: '../painel/header.component.html',

	controller: HeaderComponent,

});

function HeaderComponent ($scope, $http, $window){

    $scope.user = user();

    $scope.getCurrentUser = function() {
        $http.get($window.sessionStorage.url_rest + "account", {headers: {
            'Authorization': "Bearer " + $window.sessionStorage.token                        
        }})
        .then(function(data){
            $scope.user.email = data.data.email;
            $scope.user.name = data.data.name        
        })
        .catch(function(){
             window.location = "../index.html"            
        });

    }

    $scope.getCurrentUser();

}

function user(){
    return {
        email: "",
        name: "asdads"
    }
}