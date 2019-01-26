app.controller('loginController', function($scope, $http, $window){

	$scope.login = {
		username : "",
		password : ""
	};

	$scope.fazerLogin = function(){

		if ($scope.login.username == "" && $scope.login.password == ""){
			alert("Informe usuário e senha");
			return;
		}

        $window.sessionStorage.url_rest = 'http://150.164.180.61:9999/';

        $scope.message = {
            error: false
        }

		var serviceBase = $window.sessionStorage.url_rest + 'authenticate';	

        var req = {
            method: 'POST',
            url: serviceBase,
            headers: {},
            data: {
                grant_type: 'password',
                client_id: 'cms',
                username: $scope.login.username,
                password: $scope.login.password
            }
        }

        $http(req).then(
            function (resposta) {               
                $window.sessionStorage.token = resposta.data.access_token;
                window.location = "./painel/dashboard.html"
            },
            function (erro) {
                $scope.message.error = true;
            }
        );

		
	}

});