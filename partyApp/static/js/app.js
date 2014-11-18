var angParty = angular.module('angParty', ['ngRoute', 'ui.bootstrap', 'google-maps'.ns()]);


angParty.config(['$routeProvider', function($routeProvider){
    $routeProvider.
        when('/', {templateUrl: '/static/js/views/home.html', controller: homeController}).
        when('/users/:userId', {templateUrl: '/static/js/views/user.html', controller: userController}).
        when('/event_browse', {templateUrl: '/static/js/views/eventBrowse.html', controller: browseController,
            resolve: {
                myLocation: ["$q", function($q) {
                    var defer = $q.defer();
                    navigator.geolocation.getCurrentPosition((function(position){
                        myLat = position.coords.latitude;
                        myLon = position.coords.longitude;
                        console.log("User location: [" + myLat + ', ' + myLon + ']');
                        defer.resolve({'myLat': myLat, 'myLon': myLon});
                    }));
                    return defer.promise;
                }],
                partyLocation: ["$q", "$http", function($q, $http) {
                    var defer = $q.defer();
                    $http.get('/api/parties/')
                    .success(function(response) {
                        console.log(response);
                        defer.resolve({'response': response});
                    });
                    return defer.promise;
                }]
            }}).
        otherwise({redirectTo: '/'})

    ;
}]);