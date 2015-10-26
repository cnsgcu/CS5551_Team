describe("Hypertension", function () {
    var $scope = {};
    beforeEach(angular.mock.module('app'));
    beforeEach(angular.mock.inject(function ($rootScope, $controller) {
        $scope = $rootScope.$new();
        $controller('Hypertension', {$scope: $scope});
    }));
            
    it("Checks the Normal Hypertension logic", function () {
        
        var classForResult= $scope.detectLogic("100", "70")["classNameForResult"];
        expect(classForResult).toEqual("codegreen");
		
		var classResult= $scope.detectLogic("100", "70")["results"];
        expect(classResult).toEqual("Normal : You don't have hypertension.");
		
       });
});

describe("Hypertension", function () {
    var $scope = {};
    beforeEach(angular.mock.module('app'));
    beforeEach(angular.mock.inject(function ($rootScope, $controller) {
        $scope = $rootScope.$new();
        $controller('Hypertension', {$scope: $scope});
    }));
            
    it("Checks the Pre Hypertension logic", function () {
        
        var classForResult= $scope.detectLogic("120", "85")["classNameForResult"];
        expect(classForResult).toEqual("codeorange");
		
		var classResult= $scope.detectLogic("120", "85")["results"];
        expect(classResult).toEqual("Pre-Hypertension detected");
	});
});

describe("Hypertension", function () {
    var $scope = {};
    beforeEach(angular.mock.module('app'));
    beforeEach(angular.mock.inject(function ($rootScope, $controller) {
        $scope = $rootScope.$new();
        $controller('Hypertension', {$scope: $scope});
    }));
            
    it("Checks the Hypertension Stage 1 logic", function () {
         
        var classForResult= $scope.detectLogic("150", "100")["classNameForResult"];
        expect(classForResult).toEqual("codeorange");
		 
		var classResult= $scope.detectLogic("150", "100")["results"];
        expect(classResult).toEqual("State 1 Hypertension detected");
        
		});
});

describe("Hypertension", function () {
    var $scope = {};
    beforeEach(angular.mock.module('app'));
    beforeEach(angular.mock.inject(function ($rootScope, $controller) {
        $scope = $rootScope.$new();
        $controller('Hypertension', {$scope: $scope});
    }));
            
    it("Checks the Hypertension Stage 2 logic", function () {
        
		var classForResult= $scope.detectLogic("170", "115")["classNameForResult"];
        expect(classForResult).toEqual("codedarkorange");
	   
		var classResult= $scope.detectLogic("170", "115")["results"];
        expect(classResult).toEqual("You have State 2 Hypertension detected");
        
		});
});

describe("Hypertension", function () {
    var $scope = {};
    beforeEach(angular.mock.module('app'));
    beforeEach(angular.mock.inject(function ($rootScope, $controller) {
        $scope = $rootScope.$new();
        $controller('Hypertension', {$scope: $scope});
    }));
            
    it("Checks the Hypertension stage 3 logic", function () {
        
		var classForResult= $scope.detectLogic("180", "115")["classNameForResult"];
        expect(classForResult).toEqual("codered");
       
		var classResult= $scope.detectLogic("180", "115")["results"];
        expect(classResult).toEqual("Stage 3 Hypertension (severe) detected");
        
		});
});