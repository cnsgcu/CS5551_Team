/**
 * Login controller spec - Cuong
 */
describe('LoginCtrl', function() {

    var scope,
        controller,
        httpBackend,
        locationMock,
        deferredLogin,
        userServiceMock;

    beforeEach(module('app'));

	beforeEach(inject(function($httpBackend, $rootScope, $controller, $q) {  
		deferredLogin = $q.defer();
	    
        // mock httpBackend
        httpBackend = $httpBackend;
        httpBackend.whenGET(/^templates\/.+\.html$/).respond('');     

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
        
        // invoke doLogin with test credential
        scope.doLogin({email: 'tester@team5.com', password: 'password'});
	}));
    
    describe('#doLogin', function() {
        it('should call identify on userService', function() {
            expect(userServiceMock.identify).toHaveBeenCalledWith({email: 'tester@team5.com', password: 'password'}); 
        });
        
        describe('when the login is executed,', function() {
            it('if successful, should change to home page', function() {
                var response = {data: [{name: 'Cuong'}]};
                
                deferredLogin.resolve(response);
                scope.$digest();

                expect(locationMock.path).toHaveBeenCalledWith('/home/Cuong');
            });
        });
    });
    
});