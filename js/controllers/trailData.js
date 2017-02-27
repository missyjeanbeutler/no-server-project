angular.module('trailsApp').controller('trailData', function ($scope, mainSvc, $stateParams) {


    //------------- get single trail object -----------------//





        mainSvc.getTrail($stateParams.id).then(response => {
            
            $scope.trail = response;
            var elevationArr = response.elevation.slice(0);
            var sorted = elevationArr.sort((a, b) => {
                return b - a;
            })
            var elChange = sorted[0] - sorted[sorted.length - 1]
            $scope.elevationChange = Math.round(elChange*1000)/1000;
            var distInFeet = response.trailGIS * 5280;
            var rat = Math.asin($scope.elevationChange/distInFeet);
            if(rat === NaN) rat = Math.asin(distInFeet/$scope.elevationChange)
            $scope.ratio = Math.round((rat * 100)*10000)/10000;
            $scope.latHead = response.trailHead[1] 
            $scope.longHead = response.trailHead[0];
            $scope.latEnd = response.trailEnd[1] 
            $scope.longEnd = response.trailEnd[0];
            
        })

    

        setTimeout(function() {
            var ctx = document.getElementById('elevationChart').getContext('2d');          
            var myChart = new Chart(ctx, {
                type: 'line',

                options: {
                    legend: {
                        display: false,
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                    elements: {
                        point: {
                            radius: 0
                        }
                    },
                scales: {
                    xAxes: [{
                        display: false,
                    }],
                    yAxes: [{
                        gridLines: {
                            tickMarkLength: 0,
                            color: '#FFF',
                        },
                        ticks: {
                            padding: 15,
                            fontColor: '#FFF'
                        }
                    }],
                }
                },
                data: {
                    labels: $scope.trail.elevation,
                    datasets: [{
                        data: $scope.trail.elevation,
                        backgroundColor: "#172230",
                    }]
                }
            });
            
        }, 500);
    










})