app.controller('newsListController', function($scope, $http, $window){

    if ($window.sessionStorage.token == null || $window.sessionStorage.token == undefined){
        window.location = "index.html"
    }
	
    $scope.news = [];
    $scope.currentPage = 1;
    $scope.numPerPage = 30
    $scope.totalNews = 1;
    $scope.totalPages = 0;

    $scope.goNextPage = function(){

        if ($scope.currentPage == $scope.totalPages){
            return;
        }

        $scope.currentPage = $scope.currentPage + 1;
        $scope.getNewsList();
        
    };

    $scope.goPreviousPage = function(){

        if ($scope.currentPage == 1){
            return;
        }

        $scope.currentPage = $scope.currentPage - 1;
        $scope.getNewsList();
   };

   $scope.getNewsList = function(){

        $http.get($window.sessionStorage.url_rest + "news?page="+$scope.currentPage+"&page_size="+$scope.numPerPage, {headers: {
            'Authorization': "Bearer " + $window.sessionStorage.token                        
        }})
        .then(function(data){

            $scope.totalNews = data.data.total;
            $scope.totalPages = Math.ceil($scope.totalNews / $scope.numPerPage);

            $scope.news  = data.data.items.map(elem =>{
                return { 
                    id: elem.id,
                    title: elem.title, 
                    date: elem.post_date, 
                    text: elem.text, 
                    tags: elem.tags.map(tag =>{return  tag.name}).join(), 
                    subtitle: elem.subtitle 
                }
            });

        })
        .catch(function(error){
            if (error.status == 401){
                window.location = "../index.html"
            }
            
        });

   };

    $scope.getNewsList();

    $scope.editNews = function(id){
        window.location = "./news-create.html?id="+ id;
    }
    $scope.viewNews = function(id){
        window.location = "./news-view.html?id="+ id;
    }
    
});

function news() {
    return {
        id: -1,
        title: "",
        date: "",
        text: "",
        tags: "",
        subtitle: ""
    }
}




