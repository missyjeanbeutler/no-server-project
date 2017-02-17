angular.module('trailsApp').controller('mainCtrl', function($scope, mainSvc){


//------------- get single trail object -----------------//

$scope.getTrail = (numOfTrail) => {
    mainSvc.getTrail(numOfTrail).then(response => {
        $scope.trail = response;
    })
}

$scope.getTrail(2040);

    


    
})