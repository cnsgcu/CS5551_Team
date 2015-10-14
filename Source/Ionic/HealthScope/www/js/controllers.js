angular.module('app.controllers', [])

    .controller('Hypertension', function ($scope) {
        $scope.detectLogic = function (sbp, dbp) {
            // Do some computation..
            var sbpValue = parseFloat(sbp);
            var dbpValue = parseFloat(dbp);
            var flag = parseInt(nameValue);

            if (isNaN(sbpValue) || isNaN(dbpValue))
                return {
                    "classNameForResult": "codered",
                    "results": "Please enter the values correctly."
                }

            if (sbpValue < 110 && dbpValue < 140)
                return {
                    "classNameForResult": "codegreen",
                    "classNameForSuggestion": "bar bar-footer bar-balanced",
                    "results": "Normal : You don't have hypertension."
                }

            if (sbpValue >= 120 && sbpValue <= 139 && dbpValue < 90)
                return {
                    "classNameForResult": "card",
                    "classNameForSuggestion": "bar bar-footer bar-energized",
                    "results": "You have Pre-Hypertension."
                }

            if (sbpValue >= 140 && sbpValue <= 159 && dbpValue >= 100)
                return {
                    "classNameForResult": "card",
                    "classNameForSuggestion": "bar bar-footer bar-energized",
                    "results": "You have State 1 Hypertension."
                }


            if (sbpValue >= 160 && sbpValue <= 179 && dbpValue >= 110)
                return {
                    "classNameForResult": "card",
                    "classNameForSuggestion": "bar bar-footer bar-energized",
                    "results": "You have State 2 Hypertension."
                }

            if (sbpValue >= 180 || dbpValue >= 110)
                return {
                    "classNameForResult": "codered",
                    "classNameForSuggestion": "bar bar-footer bar-assertive",
                    "results": "You have stage 3 Hypertension (severe)."
                }
        }

        $scope.detectView = function (style) {
            document.getElementById("result").innerHTML = style["results"];
            document.getElementById("result").className = style["classNameForResult"];
            document.getElementById("suggestion").className = style["classNameForSuggestion"];
        }
    });