angular.module('trailsApp').controller('mainCtrl', function($scope, mainSvc){


//------------- get single trail object -----------------//

$scope.getTrail = (numOfTrail) => {
    mainSvc.getTrail(numOfTrail).then(response => {
        console.log(response)
        $scope.trail = response;
    })
}






    



})