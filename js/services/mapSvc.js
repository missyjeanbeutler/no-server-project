angular.module('trailsApp').service('mapSvc', function($http, mainSvc){

var polyline = mainSvc.polyline;

this.trailMap = (polyline) => {
    $http.get('https://maps.googleapis.com/maps/api/staticmap?size=400x400&path=weight:5|color:0x172230ff%7Cenc:'+ polyline +'&maptype=terrain&key=AIzaSyD7_M7I9E7xdac8wFwj2-ttWD02eDMwOLQ')
    .then(response => {
        return response;
    })
}


})


