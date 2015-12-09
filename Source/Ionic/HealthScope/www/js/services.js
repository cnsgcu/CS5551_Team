var restAPI = {
    'create':'http://healthkeeper.mybluemix.net/api/users',
    'identify':'http://healthkeeper.mybluemix.net/api/users',
    'hypertension':'http://healthkeeper.mybluemix.net/api/hypertension' ,
    'diabetes':'http://healthkeeper.mybluemix.net/api/diabetes',
    'overweight': 'http://healthkeeper.mybluemix.net/api/overweight'
};

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

angular.module('app.services', [])

.factory('UserService', function($http) {
  return {
    'create': function(userProfile) {
      var API = restAPI['create'];
      var registerAPI = API + '/';
      var request = RequestFactory.make('POST').requestTo(registerAPI).carryData(userProfile);
      
      return $http(request);
    },
    
    'identify': function(loginCredential) {
      var API = restAPI['identify'];
      var identifyAPI = API + '/identify';
      var request = RequestFactory.make('POST').requestTo(identifyAPI).carryData(loginCredential);
      
      return $http(request);
    },
     'recordHypertension': function(hypertensionVaribales) {   
      
      var API = restAPI['hypertension'];
      var hypertensionAPI = API + '/detect';
      var request = RequestFactory.make('POST').requestTo(hypertensionAPI).carryData(hypertensionVaribales);
      
      return $http(request);
     },
     
     'historyHypertension': function(historyId) {   
      console.log("Inside hypertension history function.. about to call the REST API");
      var API = restAPI['hypertension'];
      var hypertensionAPI = API + '/history/'+historyId;
      var request = RequestFactory.make('GET').requestTo(hypertensionAPI).carryData(historyId);
      
      return $http(request);
     },
      
      'recordDiabetes': function(diabetesdiagnosis) {
      console.log("In the diabetes functions signup");
      var API = restAPI['diabetes'];
      var diabetesAPI = API + '/detect';
      var request = RequestFactory.make('POST').requestTo(diabetesAPI).carryData(diabetesdiagnosis);
      
      return $http(request);
     }
  };
})

.factory('OverweightDetectionService', function($http) {
    return {
        'detect': function(weightForm) {
          var overweightDetectAPI = restAPI['overweight'] + '/';
          var request = RequestFactory.make('POST').requestTo(overweightDetectAPI).carryData(weightForm);
          
          return $http(request);
        },
    };
})

.factory('Items',function(){
    var ProteinItems=[{
        id:0,
        name: "Beans and lentils",
        tip:"Dried beans or reduced-sodium canned beans that have been drained and thoroughly rinsed. Try black, lima, pinto, garbanzo, navy, or kidney beans. Other legumes include lentils, black-eyed peas, and split peas.",
        picture:"http://www.diabetes.org/assets/img/CYP/images/250px/beans.png"
    },{
        id:1,
        name:" Nuts and seeds",
        tip:"A handful of nuts or 2 tablespoons of nut butter contains healthy fats making it a better choice than processed or fatty meats. All nuts are recommended including almonds, walnuts, pistachios, pecans, cashews, macadamia nuts, hazelnuts, Brazil nuts and pine nuts. Seeds include sunflower, sesame and sunflower; nut and seed butters include almond butter, peanut butter and sunflower seed butter.",
        picture:"http://www.diabetes.org/assets/img/CYP/images/250px/nuts-and-seeds.png"
    },{
        id:2,
        name:"Fish",
        tip:"Albacore tuna, mackerel, halibut, herring, salmon, sardines and trout all contain omega-3 fatty acids which are good for your heart as well.",
        picture:"http://www.diabetes.org/assets/img/CYP/images/250px/fish.png" 
    },{
        id:3,
        name:"Seafood",
        tip:"Good choices are whole eggs cooked with minimal fat, egg whites and egg substitutes.",
        picture:"http://www.diabetes.org/assets/img/CYP/images/250px/shrimp.png"
    },{        
        id:4,
        name:"Eggs",
        tip:"Good choices are whole eggs cooked with minimal fat, egg whites and egg substitutes.",
        picture:"http://www.diabetes.org/assets/img/CYP/images/250px/eggs.png"
    },{        
        id:5,
        name:"Cheese",
        tip:"Good choices are reduced-fat cheese and cottage cheese.",
        picture:"http://www.diabetes.org/assets/img/CYP/images/250px/cheese.png"
    },{
        id:6,
        name:"Chicken",
        tip:"Choose poultry without the skin for less saturated fat and cholesterol; choose white breast meat, which is lower in fat than the darker meat in the thigh and leg pieces. Best when grilled or roasted; refrain from frying.",
        picture:"http://www.diabetes.org/assets/img/CYP/images/250px/chicken2.png"
    },{
        id:7,
        name:"Turkey",
        tip:"Choose poultry without the skin for less saturated fat and cholesterol; choose white breast meat, which is lower in fat than the darker meat in the thigh and leg pieces. Best when grilled or roasted; refrain from frying.",
        picture:"http://www.diabetes.org/assets/img/CYP/images/250px/turkey.png"
    },{        
        id:8,
        name:"Beef",
        tip:"Choose lean cuts of beef, lamb and pork, such as chuck, rump roast, round, sirloin, T-bone steak and tenderloin.",
        picture:"http://www.diabetes.org/assets/img/CYP/images/250px/beef.png"
    },{        
        id:9,
        name:"Pork",
        tip:"Choose lean cuts of pork, such as boneless ham, Canadian bacon, tenderloin, boneless loin roast and boneless loin chops.",
        picture:"http://www.diabetes.org/assets/img/CYP/images/250px/pork.png"
    },{        
        id:10,
        name:"Hummus",
        tip:"A great choice is plant-based protein.",
        picture:"http://www.diabetes.org/assets/img/CYP/images/250px/hummus.png"
    }];
        
    var GrainsAndStarchyFoodItems=[{        
        id:11,
        name:"Calabaza",
        tip:"Starchy vegetables are great sources of vitamins, minerals and fiber. This is a good choice because it does not contain added fats, sugar or sodium.",
        picture:"http://www.diabetes.org/assets/img/CYP/images/250px/calabaza.png"
    },{        
        id:12,
        name:"Chayote squash",
        tip:"Starchy vegetables are great sources of vitamins, minerals and fiber. This is a good choice because it does not contain added fats, sugar or sodium.",
        picture:"http://www.diabetes.org/assets/img/CYP/images/250px/chayote.png"
    },{        
        id:13,
        name:"Green peas",
        tip:"Starchy vegetables are great sources of vitamins, minerals and fiber. This is a good choice because it does not contain added fats, sugar or sodium.",
        picture:"http://www.diabetes.org/assets/img/CYP/images/250px/peas.png"
    },{        
        id:14,
        name:"Corn",
        tip:"Starchy vegetables are great sources of vitamins, minerals and fiber. This is a good choice because it does not contain added fats, sugar or sodium.",
        picture:"http://www.diabetes.org/assets/img/CYP/images/250px/corn.png"
    },{        
        id:15,
        name:"Yucca",
        tip:"Portion size is important, but this choice is a great source of vitamins, minerals and fiber.",
        picture:"http://www.diabetes.org/assets/img/CYP/images/250px/yucca.png"
    },{        
        id:16,
        name:"Yams",
        tip:"Portion size is important, but this choice is a great source of vitamins, minerals and fiber.",
        picture:"http://www.diabetes.org/assets/img/CYP/images/250px/yam.png"
    },{       
        id:17,
        name:"Sweet potato",
        tip:"Portion size is important, but this choice is a great source of vitamins, minerals and fiber.",
        picture:"http://www.diabetes.org/assets/img/CYP/images/250px/sweet-potato.png"
    },{        
        id:18,
        name:"Plantain",
        tip:"Starchy vegetables are great sources of vitamins, minerals and fiber. This is a good choice because it does not contain added fats, sugar or sodium.",
        picture:"http://www.diabetes.org/assets/img/CYP/images/250px/plantain.png"
    },{        
        id:19,
        name:"Quinoa",
        tip:"This is a good choice of whole grains.  Whole grains are rich in vitamins, minerals, phytochemicals and fiber.",
        picture:"http://www.diabetes.org/assets/img/CYP/images/250px/quinoa.png"
    },{       
        id:20,
        name:"Rice",
        tip:"Portion size is important, consider eating ¼ cup of cooked rice.",
        picture:"http://www.diabetes.org/assets/img/CYP/images/250px/white-rice.png"
    },{       
        id:21,
        name:"Brown rice",
        tip:"This is a good choice of whole grains. Whole grains are rich in vitamins, minerals, phytochemicals and fiber.",
        picture:"http://www.diabetes.org/assets/img/CYP/images/250px/brown-rice.png"
    },{       
        id:22,
        name:"Tortillas",
        tip:"Try whole-wheat tortillas",
        picture:"http://www.diabetes.org/assets/img/CYP/images/250px/tortilla.png"
    },{        
        id:23,
        name:"Potatoes",
        tip:"Starchy vegetables are great sources of vitamins, minerals and fiber. This is a good choice because it does not contain added fats, sugar or sodium.",
        picture:"http://www.diabetes.org/assets/img/CYP/images/250px/potato.png"
    },{        
        id:24,
        name:"Pasta",
        tip:"Try whole-wheat pasta.",
        picture:"http://www.diabetes.org/assets/img/CYP/images/250px/pasta.png"
    }];
        
    var NonStarchyVegetableItems=[{        
        id:25,
        name:"Chilies",
        tip:"The best choices are fresh, frozen and canned vegetables and vegetable juices without added salt (sodium), fat or sugar. If using canned veggies, drain and rinse them with water to wash away about 40 percent of the sodium.",
        picture:"http://www.diabetes.org/assets/img/CYP/images/250px/chile-peppers.png"
    },{        
        id:26,
        name:"Nopales",
        tip:"The best choices are fresh, frozen and canned vegetables and vegetable juices without added salt (sodium), fat or sugar. If using canned veggies, drain and rinse them with water to wash away about 40 percent of the sodium.",
        picture:"http://www.diabetes.org/assets/img/CYP/images/250px/nopales.png"
    },{       
        id:27,
        name:"Jalapeños",
        tip:"The best choices are fresh, frozen and canned vegetables and vegetable juices without added salt (sodium), fat or sugar. If using canned veggies, drain and rinse them with water to wash away about 40 percent of the sodium.",
        picture:"http://www.diabetes.org/assets/img/CYP/images/250px/jalepenos.png"
    },{        
        id:28,
        name:"Carrots",
        tip:"The best choices are fresh, frozen and canned vegetables and vegetable juices without added salt (sodium), fat or sugar. If using canned veggies, drain and rinse them with water to wash away about 40 percent of the sodium.",
        picture:"http://www.diabetes.org/assets/img/CYP/images/250px/carrots.png"
    },{        
        id:29,
        name:"Cabbage",
        tip:"The best choices are fresh, frozen and canned vegetables and vegetable juices without added salt (sodium), fat or sugar. If using canned veggies, drain and rinse them with water to wash away about 40 percent of the sodium.",
        picture:"http://www.diabetes.org/assets/img/CYP/images/250px/cabbage.png"
    },{        
        id:30,
        name:"Eggplant",
        tip:"The best choices are fresh, frozen and canned vegetables and vegetable juices without added salt (sodium), fat or sugar. If using canned veggies, drain and rinse them with water to wash away about 40 percent of the sodium.",
        picture:"http://www.diabetes.org/assets/img/CYP/images/250px/eggplant.png"
    },{        
        id:31,
        name:"Cauliflower",
        tip:"The best choices are fresh, frozen and canned vegetables and vegetable juices without added salt (sodium), fat or sugar. If using canned veggies, drain and rinse them with water to wash away about 40 percent of the sodium.",
        picture:"http://www.diabetes.org/assets/img/CYP/images/250px/cauliflower.png"
    },{        
        id:32,
        name:"Broccoli",
        tip:"The best choices are fresh, frozen and canned vegetables and vegetable juices without added salt (sodium), fat or sugar. If using canned veggies, drain and rinse them with water to wash away about 40 percent of the sodium.",
        picture:"http://www.diabetes.org/assets/img/CYP/images/250px/brocolli.png"
    },{        
        id:33,
        name:"Jicama",
        tip:"The best choices are fresh, frozen and canned vegetables and vegetable juices without added salt (sodium), fat or sugar. If using canned veggies, drain and rinse them with water to wash away about 40 percent of the sodium.",
        picture:"http://www.diabetes.org/assets/img/CYP/images/250px/jicama.png"
    },{        
        id:34,
        name:"Tomatoes",
        tip:"The best choices are fresh, frozen and canned vegetables and vegetable juices without added salt (sodium), fat or sugar. If using canned veggies, drain and rinse them with water to wash away about 40 percent of the sodium.",
        picture:"http://www.diabetes.org/assets/img/CYP/images/250px/tomato.png"
    },{        
        id:35,
        name:"Spinach",
        tip:"The best choices are fresh, frozen and canned vegetables and vegetable juices without added salt (sodium), fat or sugar. If using canned veggies, drain and rinse them with water to wash away about 40 percent of the sodium.",
        picture:"http://www.diabetes.org/assets/img/CYP/images/250px/spinach.png"
    },{        
        id:36,
        name:"Peppers",
        tip:"The best choices are fresh, frozen and canned vegetables and vegetable juices without added salt (sodium), fat or sugar. If using canned veggies, drain and rinse them with water to wash away about 40 percent of the sodium.",
        picture:"http://www.diabetes.org/assets/img/CYP/images/250px/green-pepper.png"
    }];
        
   return {
    allProtein: function() {
      return ProteinItems;
    },
     allGrainsAndStarchy: function() {
      return GrainsAndStarchyFoodItems;
    },
    allNonStarchyVegetable: function() {
      return NonStarchyVegetableItems;
    },
    }
});
