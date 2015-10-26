angular.module('app.services', [])

.factory('UserService', function($http) {
  var RequestFactory = {
    make: function(reqMethod) {
      this.tmp = {};
      this.tmp.method = reqMethod;
      
      return this;
    },
    
    requestTo: function(reqUrl) {
      this.tmp.url = reqUrl
      
      return this;
    },
    
    carryData: function(reqData) {
      var request = this.tmp;
      this.tmp = null;
            
      request.data = JSON.stringify(reqData);
      request.contentType = 'application/json'

      return request;
    }
  };
  
  var restAPI = 'http://healthkeeper.mybluemix.net/api/users';

  return {
    'create': function(userProfile) {
      var registerAPI = restAPI + '/';
      var request = RequestFactory.make('POST').requestTo(registerAPI).carryData(userProfile);
      
      return $http(request);
    },
    
    'identify': function(loginCredential) {
      var identifyAPI = restAPI + '/identify';
      var request = RequestFactory.make('POST').requestTo(identifyAPI).carryData(loginCredential);
      
      return $http(request);
    }
  };
})
;