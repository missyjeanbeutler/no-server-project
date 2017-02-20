angular.module('trailsApp').controller('trailData', function ($scope, mainSvc, $stateParams, mapSvc) {


    //------------- get single trail object -----------------//




    getTrail($stateParams.id)    

    function getTrail(num) {
        mainSvc.getTrail(num).then(response => {
            $scope.trail = response;
            console.log(response.elevation)
            var a = response.elevation.map((a) => {
                let i = 0;
                if(a > i) i = a;
                return i;
            })
            var b = response.elevation.map((a) => {
                let i = 0;
                if(a < i) i = a;
                return i;
            })
            $scope.elevationChange = Math.max(a[0]) - Math.min(b[0]);
            var distInFeet = response.trailGIS * 5280;
            $scope.ratio = Math.asin(distInFeet/$scope.elevationChange)
            $scope.latHead = response.trailHead[1] 
            $scope.longHead = response.trailHead[0];
            $scope.latEnd = response.trailEnd[1] 
            $scope.longEnd = response.trailEnd[0];
            
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