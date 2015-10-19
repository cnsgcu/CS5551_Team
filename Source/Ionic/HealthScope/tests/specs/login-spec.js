describe('LoginController', function() {

    var scope,
        controller, 
        deferredLogin,
        locationMock,
        userServiceMock;

    beforeEach(module('app'));

	beforeEach(inject(function($rootScope, $controller, $q) {  
		deferredLogin = $q.defer();
	
		// mock UserService
		userServiceMock = {
			'identify': jasmine.createSpy('identify spy').and.returnValue(deferredLogin.promise)           
		};
	
		// mock $location
		locationMock = jasmine.createSpyObj('$location spy', ['path']);
        
        // instantiate $scope
        scope = $rootScope.$new();
        
		// instantiate LoginController
		controller = $controller('LoginCtrl', {
            $scope: scope,
            $location: locationMock,
            UserService: userServiceMock 
        });
        
        // Invoke doLogin with test credential
        scope.doLogin({email: 'test', password: 'password'});
	}));
    
    describe('#doLogin', function() {
        it('should call identify on userService', function() {
            expect(userServiceMock.identify).toHaveBeenCalledWith({email: 'test', password: 'password'}); 
        });

        describe('when the login is executed,', function() {
            it('if successful, should change to home page', function() {

                deferredLogin.resolve();  
                scope.$digest();

                expect(locationMock.path).toHaveBeenCalledWith('/home/Cuong');
            });
        });
    })
});