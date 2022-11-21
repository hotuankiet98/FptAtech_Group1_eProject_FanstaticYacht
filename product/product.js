    var nextPageBtn=$(".next-btn");
    var prevPageBtn=$(".prev-btn");
    var filterBtn=$(".filter__btn");
    var options =[];
    let d = new Date();
    let year = d.getFullYear();
    // var itemCompare=$(".boat-item__compare");
    const mainApp={
        
    angularJsEvent(){
            var app=angular.module('myApp',['angularUtils.directives.dirPagination']);
            app.controller("myController",function($scope,$http){
            $http.get('yachts.json').then(function(response){
                $scope.list=response.data.yachtsList;
                $scope.sortYachts='';
                $scope.reverse=false;
                $scope.sortData=function(button){
                    if($scope.sortYachts==button){
                        $scope.reverse=!$scope.reverse;
                    }else{
                        $scope.reverse=false;
                        $scope.sortYachts=button;
                    }
                }
                $scope.getSortClass = function (button) {
                    if ($scope.sortYachts == button) {
                        return $scope.reverse ? 'fa-solid fa-arrow-down':'fa-solid fa-arrow-up';
                    }
                    return '';
                }
                $scope.hideIcon=function(button){
                    if($scope.sortYachts==button){
                        return true;
                    }
                }
                $scope.$watch('findType', function() {  
                        switch($scope.findType){
                            case "any":
                                $scope.findType={};
                                break;
                        }
                });
                $scope.resetForm = function() {
                    $scope.findType=undefined;
                    $scope.findName=undefined;
                    $scope.findCategory=undefined;
                    $scope.findYear=undefined;
                    $scope.findLength=undefined;
                    $scope.findPrice=undefined;
                }
            
                $scope.addCompare=function(item){ 
                    var count=0;
                    var index=-1;
                    for(var i=0;i<$scope.list.length;i++){
                        if($scope.list[i].id==item+1){
                                index=i;
                            }
                    }
                    if($scope.list[index].favorite==true){
                        $scope.list[index].favorite=false;
                    }else{
                        var updateFavorite = true; 
                        $scope.list[index].favorite=updateFavorite;
                    }
                    for(var i=0;i<$scope.list.length;i++){
                        if($scope.list[i].favorite==true){
                                count++;
                        }
                    } 
                    if(count>0){
                        $scope.hideFavoriteNum=true;
                        $scope.hideFavoriteTable=true;
                    }else{
                        $scope.hideFavoriteTable=false; 
                    }
                    localStorage.countFavorite=count;
                    $scope.countFavorite=localStorage.countFavorite;
                    $scope.hideFavoriteIcon=function (item) {
                        if($scope.list[item].favorite==true){
                            return true;
                        }else{
                            return false;
                        }
                    }
                    $scope.getClassFavorite=function (item) {
                        if( $scope.list[item].favorite==true){
                          
                            return 'fa-solid fa-heart'
                            
                        }else{
                            return ''
                        }
                    }       
                }   
            })
        });   
    },

    start(){
    this.angularJsEvent();
}
    }
mainApp.start()







    
  
