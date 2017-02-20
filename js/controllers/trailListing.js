angular.module('trailsApp').controller('trailListing', function($scope, mainSvc){


function getTrailData() {
    $scope.trails = mainSvc.giveData();
}


getTrailData();


$scope.distanceLongShort = function() {
    $scope.trails = $scope.trails.sort(function(a, b){
        return b.trailGIS - a.trailGIS;
    })
}

$scope.distanceShortLong = function() {
    $scope.trails = $scope.trails.sort(function(a, b){
        return a.trailGIS - b.trailGIS;
    })
}









    



})