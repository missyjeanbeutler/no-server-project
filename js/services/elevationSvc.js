angular.module('trailsApp').service('elevationSvc', function ($http){



this.getTrailElevation = (trailPolyline, sampNum) => {
    return $http.get('https://maps.googleapis.com/maps/api/elevation/json?path=enc:'+ trailPolyline + '&samples=' + sampNum + '&key=AIzaSyD7_M7I9E7xdac8wFwj2-ttWD02eDMwOLQ')
    .then(response => {
        return response.data.results;
    })
    .then(response => {
        console.log(response.status + ' status')
        var elArr = [];
        for(var i = 0; i < response.length; i++) {
            elArr.push(response[i].elevation)
        }
         return elArr;
    })
}









})