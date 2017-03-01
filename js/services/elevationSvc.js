angular.module('trailsApp').service('elevationSvc', function ($http){

this.getTrailElevation = (trailPolyline, sampNum) => {
    return $http.get('https://maps.googleapis.com/maps/api/elevation/json?path=enc:'+ trailPolyline + '&samples=' + sampNum + '&key=' + apikey)
    .then(response => {
        if(response.data.status !== 'OK') return 'Error' + response.data.status;
        return response.data.results;
    })
    .then(response => {
        var elArr = [];
        for(var i = 0; i < response.length; i++) {
            elArr.push(response[i].elevation * 3.28084)
        }
         return elArr;
    })
}

})