angular.module('trailsApp', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider){


    $urlRouterProvider.when('', '/');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '../views/home.html',
            })
            .state('chooseTrail', {
                url: '/chooseTrail',
                templateUrl: '../views/chooseTrail.html',
                controller: 'chooseTrail'
            })
            .state('trailListing', {
                url: '/trailListing',
                templateUrl: '../views/trailListing.html',
                controller: 'trailListing'
            })
            .state('trailData', {
                url: '/trailData/:id',
                templateUrl: '../views/trailData.html',
                controller: 'trailData'
            })


        $urlRouterProvider
            .otherwise('/');

});
