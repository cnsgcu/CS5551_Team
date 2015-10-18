angular.module('app.services', [])

.factory('Camera', ['$q', function($q) {
  return {
    getPicture: function(options) {
      var q = $q.defer();

      navigator.camera.getPicture(function(result) {
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    }
  }
}])

.factory('UserService', function($http) {
  var RequestFactory = {
    make: function(reqMethod) {
      this.tmp = {};
      this.tmp.method = reqMethod;
      return this;
    },
    
    requestTo: function(reqUrl) {
      this.tmp.url = reqUrl
      
      if (this.tmp.method === 'DELETE') {
        var request = this.tmp;
        this.tmp = null;
        
        return request;
      }
      
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
    'create': function(userProfile, successHdlr, errorHdlr) {
      var registerAPI = restAPI + '/';
      var request = RequestFactory.make('POST').requestTo(registerAPI).carryData(userProfile);
      
      $http(request).success(successHdlr).error(errorHdlr);
    },
    
    'identify': function(loginCredential, successHdlr, errorHdlr) {
      var identifyAPI = restAPI + '/identify';
      var request = RequestFactory.make('POST').requestTo(identifyAPI).carryData(loginCredential);
      
      $http(request).success(successHdlr).error(errorHdlr);
    }
  };
})
;