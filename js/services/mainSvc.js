angular.module('trailsApp').service('mainSvc', function ($http, polylineSvc, elevationSvc, $q) {

    let data = false;
    this.publicData = data;

    this.doAllTheThings = doAllTheThings;

    this.smallData = smallData;

    this.getJSON = getJSON;

    this.polyline = '';


    getJSON().then(response => {
        data = response;
        return data;
    });





    function smallData() {
        var miniData = [];
        for (var i = 0; i < data.length; i++) {
            miniData.push({
                trailNum: data[i].trailNum,
                trailName: data[i].trailName,
                trailGIS: data[i].trailGIS
            })

        }
        return miniData;
    }
    // -------------------- Get Full Data Array ----------------------//
    function getJSON() {
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


    function doAllTheThings(trailNumber) {
        let deferred = $q.defer()
        if (data) {
            getTrail(trailNumber).then(response => {
                deferred.resolve(response)
            })
        } else {
            getJSON().then(response => {
                return getTrail(trailNumber)
            }).then(response => {
                deferred.resolve(response)
            })
        }
        return deferred.promise;
    }


    function getTrail(trailNumber) {

        let deferred = $q.defer();
        let index = getIndex(trailNumber);

        if (data[index].trailCoord.length < 500) {
            polyline = polylineSvc.createEncodings(data[index].trailCoord);
        } else if (data[index].trailCoord.length < 640) { // take out every other third element
            for (var k = 1; k < data[index].trailCoord.length; k += 3) {
                data[index].trailCoord.splice(k, 1)
            }
            polyline = polylineSvc.createEncodings(data[index].trailCoord);
        } else if (data[index].trailCoord.length < 990) { // take out every other second element
            for (var g = 1; g < data[index].trailCoord.length; g += 2) {
                data[index].trailCoord.splice(g, 1)
            }
            polyline = polylineSvc.createEncodings(data[index].trailCoord);
        } else { // make it fit 499
            let divideNum = Math.ceil(data[index].trailCoord.length / 499);
            for (var g = 1; g < data[index].trailCoord.length; g++) {
                data[index].trailCoord.splice(g, divideNum)
            }
            polyline = polylineSvc.createEncodings(data[index].trailCoord);
        }

        returnElevation(polyline, index).then(response => {
            return deferred.resolve(response);
        })

        return deferred.promise;
    }

    function getIndex(trailNumber) {
        let index = -1;

        for (var i = 0; i < data.length; i++) {
            if (data[i].trailNum === trailNumber) {
                index = i;
            }
        }
        return index;

    }

    function indexForLoop() {

    }

    function returnElevation(polyline, index) {
        return elevationSvc.getTrailElevation(polyline, data[index].trailCoord.length)
            .then(response => {
                data[index].elevation = response;
                return data[index];
            })
    }


})