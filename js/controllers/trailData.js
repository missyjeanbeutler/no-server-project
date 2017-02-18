angular.module('trailsApp').controller('trailData', function ($scope, mainSvc, $stateParams) {


    //------------- get single trail object -----------------//

    $scope.trail = mainSvc.getTrail($stateParams.id);

    console.log($scope.trail)
    setTimeout(function(){

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

    },1000)












})