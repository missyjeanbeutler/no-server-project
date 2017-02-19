angular.module('trailsApp').controller('trailData', function ($scope, mainSvc, $stateParams) {


    //------------- get single trail object -----------------//


    
    getTrail($stateParams.id)

    function getTrail(num) {
        mainSvc.getTrail(num).then(response => {
            $scope.trail = response;
            elevationChart($scope.trail.elevation)
        })
    }

    

    function elevationChart(elevation) {

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

    }









})