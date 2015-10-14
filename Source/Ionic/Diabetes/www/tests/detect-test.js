describe("DiaDet", function () {
    var $scope = {};
    beforeEach(angular.mock.module('starter'));
    beforeEach(angular.mock.inject(function ($rootScope, $controller) {
        $scope = $rootScope.$new();
        $controller('DiaDet', {$scope: $scope});
    }));
            
    it("Checks the detection", function () {
        $scope.diaDetectLogic("90", "200");
        var classForResult= $scope.diaDetectLogic("90", "200")["classNameForResult"];
        expect(classForResult).toEqual("card");
        var classForSuggestion = $scope.diaDetectLogic("90", "200")["classNameForSuggestion"];
        expect(classForSuggestion).toEqual("bar bar-footer bar-balanced");
        var resultsContent = $scope.diaDetectLogic("90","200")["results"];
        expect(resultsContent).toEqual("Diabetes mellitus: A positive result, in the absence of unequivocal high blood sugar, should be confirmed by a repeat of any of the above methods on a different day. It is preferable to measure a fasting glucose level because of the ease of measurement and the considerable time commitment of formal glucose tolerance testing, which takes two hours to complete and offers no prognostic advantage over the fasting test.According to the current definition, two fasting glucose measurements above 126 mg/dl (7.0 mmol/l) is considered diagnostic for diabetes mellitus.");
         expect($scope.diaDetectLogic("90", "95")["results"]).toEqual("Normal");
        expect($scope.diaDetectLogic("115", "135")["results"]).toEqual("Impaired fasting glycaemia glucose: more commonly known as pre-diabetes refers to a condition in which the fasting blood glucose level is consistently elevated above what is considered normal levels; however, it is not high enough to be diagnosed as diabetes mellitus.");
        expect($scope.diaDetectLogic("110", "150")["results"]).toEqual("Impaired glucose tolerance(IGT): is a pre-diabetic state of hyperglycemia that is associated with insulin resistance and increased risk of cardiovascular pathology. IGT may precede type 2 diabetes mellitus by many years. IGT is also a risk factor for mortality.");
        
});
});