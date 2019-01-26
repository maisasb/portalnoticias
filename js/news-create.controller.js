app.controller('newsCreateController', function($scope, $http, $window, $location){

    if ($window.sessionStorage.token == null || $window.sessionStorage.token == undefined){
        window.location = "index.html"
    }
	
    $scope.news = news();
    $scope.message = {
        success: "",
        error: ""
    }

    $scope.screenName = "Cadastro";

    $scope.id = $location.search().id;  
    if ($scope.id == undefined) $scope.id = -1;
    else $scope.screenName = "Edição"
       

    $scope.getNews = function(){

        var serviceBase = $window.sessionStorage.url_rest + 'news/'; 

        var req = {
            method: 'GET',
            url: serviceBase,
            headers: { 'Authorization': "Bearer " + $window.sessionStorage.token  },
            params: {
                id: $scope.id                
            }
        }
        $http(req).then(
            function (resposta) {               
                $scope.news.title = resposta.data.title;
                $scope.news.id = resposta.data.id;
                $scope.news.subtitle = resposta.data.subtitle;
                if (resposta.data.tags){
                    $scope.news.tags = resposta.data.tags.map(tag =>{return  tag.name}).join();    
                }                
                $scope.news.text = resposta.data.text;
            },
            function (erro) {
                $scope.message.error = "Erro ao carregar notícia";
            }
        );

  
    }

    if ($scope.id != -1){
        $scope.getNews();
    }

    $scope.processaFormCadastro = function(){

        if ($scope.id != -1){
            $scope.processaFormEdicao();
            return;
        }

        var serviceBase = $window.sessionStorage.url_rest + 'news'; 

        var req = {
            method: 'POST',
            url: serviceBase,
            headers: { 'Authorization': "Bearer " + $window.sessionStorage.token  },
            data: {
                id: $scope.news.id,
                title: $scope.news.title,
                subtitle: $scope.news.subtitle,
                text: $scope.news.text,
                type: 2,
                tags: $scope.news.tags
            }
        }

        $http(req).then(
            function (resposta) {               
                $scope.message.success = "Notícia cadastrada com sucesso";
                $scope.news = news();
            },
            function (erro) {
                $scope.message.error = "Erro ao cadastrar a notícia, favor, tente novamente.";
            }
        );

    };

    $scope.processaFormEdicao = function(){


        var serviceBase = $window.sessionStorage.url_rest + 'news/';  


        var req = {
            method: 'PUT',
            url: serviceBase,
            headers: { 'Authorization': "Bearer " + $window.sessionStorage.token  },
            params:{
                id: $scope.news.id
            },
            data: {
                id: $scope.news.id,
                title: $scope.news.title,
                subtitle: $scope.news.subtitle,
                text: $scope.news.text,
                type: 2,
                tags: $scope.news.tags
            }
        }


        $http(req).then(
            function (resposta) {               
                $scope.message.success = "Notícia alterada com sucesso!";               
            },
            function (erro) {
                $scope.message.error = "Erro ao cadastrar a notícia, favor, tente novamente.";
            }
        );
        

    };

    
});

function news() {
    return {
        id: -1,
        title: "",
        date: "",
        text: "",
        tags: [],
        subtitle: ""
    }
}




