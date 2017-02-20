angular.module('trailsApp').controller('trailData', function ($scope, mainSvc, $stateParams) {


    //------------- get single trail object -----------------//


    
    getTrail($stateParams.id)

    function getTrail(num) {
        mainSvc.getTrail(num).then(response => {
            $scope.trail = response;
            var distInFeet = response.trailGIS * 5280;
            console.log(distInFeet)
            console.log($scope.trail.elevation.length)
            
        })
    }

    

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
                        },
                        ticks: {
                            padding: 15,
                        }
                    }],
                }
                },
                data: {
                    labels: $scope.trail.elevation,
                    datasets: [{
                        data: $scope.trail.elevation,
                        backgroundColor: "#222",
                    }]
                }
            });



        }, 500);
    









})