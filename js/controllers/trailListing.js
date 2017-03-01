angular.module('trailsApp').controller('trailListing', function($scope, mainSvc){

//hide loading gif
function getTrailData() {
    //show loading gif
    if(mainSvc.publicData) {
        $scope.trails = mainSvc.smallData()
        //hide loading gif
    } else {
        mainSvc.getJSON().then(response => {
            $scope.trails = mainSvc.smallData()
        //hide loading gif
            
        })
    }
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