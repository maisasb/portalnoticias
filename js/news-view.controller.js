app.controller('newsCreateController', function($scope, $http, $window, $location){

    if ($window.sessionStorage.token == null || $window.sessionStorage.token == undefined){
        window.location = "index.html"
    }
	
    $scope.news = news();


    $scope.id = $location.search().id;
    if ($scope.id == undefined) $scope.id = -1;
    $scope.message = {
        error: false
    }
       

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
                $scope.news.date = resposta.data.post_date;
                if (resposta.data.tags){
                    $scope.news.tags = resposta.data.tags.map(tag =>{return  tag.name}).join();    
                }                
                $scope.news.text = resposta.data.text;
            },
            function (erro) {
                $scope.message.error = true;
            }
        );

  
    }

    if ($scope.id != -1){
        $scope.getNews();
    }

    
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




