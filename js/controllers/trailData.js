angular.module('trailsApp').controller('trailData', function ($scope, mainSvc) {


    //------------- get single trail object -----------------//

    $scope.trail;
    
    $scope.getTrail = (numOfTrail) => {
        mainSvc.getTrail(numOfTrail).then(response => {
            console.log(response)
            $scope.trail = response;
        })
    }

    var elevation = $scope.trail.elevation;

    var ctx = document.getElementById('elevationChart');
    var myChart = new Chart(ctx, {
        type: 'line',

        options: {
            responsive: true,
            maintainAspectRatio: false,
            elements: {
                point: {
                    radius: 0
                }
            }
        },
        data: {
            // labels: reso,
            datasets: [{
                //   label: 'elevation',
                data: elevation,
                backgroundColor: "rgba(15,150,255,0.4)",
            }]
        }
    });










})