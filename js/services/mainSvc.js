angular.module('trailsApp').service('mainSvc', function($http, polylineSvc, elevationSvc){
    

    let data;
    this.getTrail = getTrail;    


    // -------------------- Get Full Data Array ----------------------//

    getAllTrailsData().then(response => {
        data = response; 
        return data;
    });

    function getAllTrailsData() {
        return $http.get('../data.json').then(response => {
            return parseData(response.data.features);
        })
    }
    
    function parseData(trailData) {
        return trailData.map((item, i, arr) => {
            let coordinatesArr = item.geometry.coordinates[0];

            return {
                trailNum: item.properties.TRAIL_NO,
                trailName: item.properties.TRAIL_NAME,
                trailHead: coordinatesArr[0],
                trailEnd: coordinatesArr[coordinatesArr.length - 1],
                trailGIS: item.properties.GIS_MILES,
                trailCoord: coordinatesArr
            }
        })
    }

    // -------------------- Get polyline/elevation and return full trail object with all info ----------------------//
    

    function getTrail(trailNumber) {
        var index = -1;
        for (var i = 0; i < data.length; i++) {
            if (data[i].trailNum === trailNumber) {
                index = i;
            } 
        }

        return polylineSvc.createEncodings(data[i].trailCoord)
        .then(response => {
            return elevationSvc.getTrailElevation(response, data[i].length);
        })
        .then(response => {
            data[i].elevation = response;
            return data[i];
        })
        
    }









})