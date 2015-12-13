// Git
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'app' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'app.services' is found in services.js
// 'app.controllers' is found in controllers.js

angular.module('app', ['ionic', 'app.controllers', 'app.services', 'ngCordova', 'chart.js', 'ui.router'])

    .config(function ($stateProvider, $urlRouterProvider, $compileProvider) {
        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router

        $stateProvider
            .state('splash', {
                url: '/',
                templateUrl: 'templates/splash.html'
            })

            .state('login', {
                url: '/login',
                controller: 'LoginCtrl',
                templateUrl: 'templates/login.html'
            })

            .state('signup', {
                url: '/signup',
                controller: 'SignupCtrl',
                templateUrl: 'templates/signup.html'
            })

            .state('suggestHP', {
                url: '/suggestHP',
                controller: 'SliderController',
                templateUrl: 'templates/suggestHP.html'
            })

            .state('videoHP', {
                url: '/videoHP',
                controller: 'VideoController',
                templateUrl: 'templates/movieHP.html',
            })

            .state('historyHP', {
                url: '/historyHP',
                controller: 'HypertensionHistoryController',
                templateUrl: 'templates/historyHP.html',
            })

            .state('home', {
                url: '/home/:name',
                controller: 'HomeCtrl',
                templateUrl: 'templates/home.html'
            })

            .state('hypertension', {
                url: '/hypertension',
                controller: 'Hypertension',
                templateUrl: 'templates/hypertension.html'
            })

            .state('diabetes', {
                url: "/diabetes",
                abstract: true,
                templateUrl: "templates/diabetes_menu.html"
            })

            .state('diabetes.detection', {
                url: '/detection',
                views: {
                    menuContent: {
                        controller: 'DiaDet',
                        templateUrl: 'templates/diabetes_detection.html'
                    }
                }
            })

            .state('diabetes.suggestion', {
                url: '/suggestion',
                views: {
                    menuContent: {
                        controller: 'DiaSug',
                        templateUrl: 'templates/diabetes_suggestion.html'
                    }
                }
            })

            .state('diabetes.history', {
                url: '/history',
                views: {
                    menuContent: {
                        controller: 'DiaHistory',
                        templateUrl: 'templates/diabetes_history.html'
                    }
                }
            })

            .state('overweight', {
                url: '/overweight',
                abstract: true,
                templateUrl: 'templates/overweight_menu.html'
            })

            .state('overweight.detection', {
                url: '/detection',
                views: {
                    menuContent: {
                        controller: 'OverweightDetectionCtrl',
                        templateUrl: 'templates/overweight_detection.html'
                    }
                }
            })

            .state('overweight.history', {
                url: '/history',
                views: {
                    menuContent: {
                        controller: 'OverweightHistoryCtrl',
                        templateUrl: 'templates/overweight_history.html'
                    }
                }
            });

        // If none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/');
    })

    .directive('slider', function ($timeout) {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                images: '='
            },
            link: function (scope, elem, attrs) {

                scope.currentIndex = 0;

                scope.next = function () {
                    scope.currentIndex < scope.images.length - 1 ? scope.currentIndex++ : scope.currentIndex = 0;
                };

                scope.prev = function () {
                    scope.currentIndex > 0 ? scope.currentIndex-- : scope.currentIndex = scope.images.length - 1;
                };

                scope.$watch('currentIndex', function () {
                    scope.images.forEach(function (image) {
                        image.visible = false;
                    });
                    scope.images[scope.currentIndex].visible = true;
                });

                /* Start: For Automatic slideshow*/

                var timer;

                var sliderFunc = function () {
                    timer = $timeout(function () {
                        scope.next();
                        timer = $timeout(sliderFunc, 5000);
                    }, 5000);
                };

                sliderFunc();

                scope.$on('$destroy', function () {
                    $timeout.cancel(timer);
                });

                /* End : For Automatic slideshow*/

            },
            templateUrl: 'templates/templateurl.html'
        }
    })

    .directive('overweightChart', function ($window) {
        var d3 = $window.d3;
        var xScale, yScale;
        var chartHeight, chartWidth;
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        function setupChartView(svg, dataPoints) {
            var maxY = dataPoints.map(function(d) {return d.y}).reduce(function(a, b){
                if (a > b) {
                    return a;
                } else {
                    return b;
                }
            });

            var minY = dataPoints.map(function(d) {return d.y}).reduce(function(a, b){
                if (a > b) {
                    return b;
                } else {
                    return a;
                }
            });

            xScale = d3.time.scale()
                .domain([dataPoints[0].x, new Date(dataPoints[dataPoints.length - 1].x.getTime() + 302400000)])
                .range([30, chartWidth - 5]);

            yScale = d3.scale.linear()
                .domain([0, maxY + (maxY - minY) / dataPoints.length])
                .range([chartHeight - 45, 0]);

            var xAxisGen = d3.svg.axis()
                .scale(xScale)
                .orient("bottom")
                .tickValues(dataPoints.map(function (d) {
                    return d.x;
                }))
                .tickFormat(function (d, i) {
                    return months[d.getMonth()] + " " + d.getDate();
                })
                .innerTickSize(-chartHeight)
                .outerTickSize(0)
                .tickPadding(dataPoints.length);

            var yAxisGen = d3.svg.axis()
                .scale(yScale)
                .orient("left")
                .tickFormat(function (d, i) {
                    if (i === 0 || d > maxY) {
                        return "";
                    }
                    return d;
                })
                .innerTickSize(-chartWidth + 25)
                .outerTickSize(0)
                .tickPadding(dataPoints.length);

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0, " + (chartHeight - 45) + ")")
                .call(xAxisGen);

            svg.append("g")
                .attr("transform", "translate(30, 0)")
                .attr("class", "y axis")
                .call(yAxisGen);
        }

        return {
            restrict: "EA",
            template: "<svg style='background-color: #8FD4D1; display: block; position: absolute; width: 100%; height: 100%;'></svg>",
            link: function ($scope, $elem, attrs) {
                var dataPoints = $scope.dataPoints;
                var svgDom = $elem.find("svg")[0];
                var svg = d3.select(svgDom);

                chartWidth = svgDom.offsetWidth;
                chartHeight = svgDom.offsetHeight;

                setupChartView(svg, dataPoints);

                var plot = d3.svg.line()
                    .x(function (d) {
                        return xScale(d.x);
                    })
                    .y(function (d) {
                        return yScale(d.y);
                    })
                    .interpolate("cardinal");

                svg.append("path")
                    .attr("d", plot(dataPoints));

                svg.selectAll(".point")
                    .data(dataPoints)
                    .enter().append("circle")
                    .attr("stroke", "white")
                    .attr("fill", function (d, i) {
                        return "#81BFBC";
                    })
                    .attr("stroke-width", function(d, i) {
                        return 2;
                    })
                    .attr("r", function (d, i) {
                        return 4;
                    })
                    .attr("cx", function (d, i) {
                        return xScale(d.x);
                    })
                    .attr("cy", function (d, i) {
                        return yScale(d.y);
                    });
            }
        };
    })

    .directive('validated', function ($parse) {
        return {
            restrict: 'AEC',
            require: '^form',
            link: function (scope, element, attrs, form) {
                var inputs = element.find("*");

                for (var i = 0; i < inputs.length; i++) {
                    (function (input) {
                        var attributes = input.attributes;

                        if (attributes.getNamedItem('ng-model') != void 0 && attributes.getNamedItem('name') != void 0) {
                            var field = form[attributes.name.value];

                            if (field != void 0) {
                                scope.$watch(function () {
                                    return form.$submitted + "_" + field.$valid;
                                }, function () {
                                    if (form.$submitted != true) return;

                                    var inp = angular.element(input);

                                    if (inp.hasClass('ng-invalid')) {
                                        element.removeClass('has-success');
                                        element.addClass('has-error');
                                    } else {
                                        element.removeClass('has-error').addClass('has-success');
                                    }
                                });
                            }
                        }
                    })(inputs[i]);
                }
            }
        }
    });