/**
 * Signup controller spec - Cuong
 */
describe('SignupCtrl', function() {
	
	var scope,
		controller,
		httpBackend,
		locationMock,
		deferredSignup,
		userServiceMock;
	
	var userProfile = {
		'dob': '01/01/1010',
		'name': 'Cuong Cu',
		'email': 'tester@team5.com',
		'password': '12345',
		'repassword': '12345'
	};
	
	beforeEach(module('app'));
	
	beforeEach(inject(function($httpBackend, $rootScope, $controller, $q) {
		deferredSignup = $q.defer();

		// mock $httpBackend
		httpBackend = $httpBackend;
        httpBackend.whenGET(/^templates\/.+\.html$/).respond('');     

		// initiate $scope
		scope = $rootScope.$new();
		
		// mock UserService
		userServiceMock = {
			'create': jasmine.createSpy('create spy').and.returnValue(deferredSignup.promise)
		}
		
		// mock $location
		locationMock = jasmine.createSpyObj('$location spy', ['path']);
		
		// initiate Signup controller
		controller = $controller('SignupCtrl', {
			$scope: scope,
			$location: locationMock,
			UserService: userServiceMock
		});
		
		// Assign test user profile
		scope.user = userProfile;
		
		// invoke doSubmit
		scope.doSubmit();
	}));
	
	describe('#doSignup', function() {
		it('should call create on userService', function() {
			var expectProfile = JSON.parse(JSON.stringify(userProfile));
			delete expectProfile['repassword'];
			
			expect(userServiceMock.create).toHaveBeenCalledWith(expectProfile);
		});
		
		describe('when the signup is executed', function() {
			it('if successful, should go back to landing page', function() {
				deferredSignup.resolve();
				scope.$digest();
				
				expect(locationMock.path).toHaveBeenCalledWith('/');
			});
		});
	});
	
});