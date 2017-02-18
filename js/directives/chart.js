angular.module('trailsApp').directive('chartDirective', function(){

return {
    restrict: 'AE',
    templateUrl: '../../html/chart.html',
    scope: {

    },
    link: function(scope, el, attrib) {

    }
    





}

var ctx = document.getElementById('elevationChart').getContext('2d');
var myChart = new Chart(ctx, {
  type: 'line',

  options: {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
        point:{
            radius: 0
              }
    }
    },
  data: {
    // labels: reso,
    datasets: [{
    //   label: 'elevation',
      data: elData,
      backgroundColor: "rgba(15,150,255,0.4)",
    }
    ]
  }
});

})





