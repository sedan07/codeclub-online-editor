describe('EditorController', function() {
    
    var scope,
        localStorageService,
        ctrl;
    
    beforeEach(function () {
        module('ccApp');
        module('ccApp.controllers');
        module('LocalStorageModule');
        
    });
    
    beforeEach(inject(function ($controller, $rootScope, _localStorageService_) {
        localStorageService = _localStorageService_;
        scope = $rootScope.$new();

        ctrl = $controller;
    }));
    
   it('should call the local storage service to load in any cached data', function() {
      spyOn(localStorageService, 'get');
      
      ctrl("EditorController", {
            $scope: scope,
            localStorageService: localStorageService
      });
      
      expect(localStorageService.get).toHaveBeenCalled();
   }); 
   
   xit('should setup the default editor sessions once the ACE editor has loaded', function() {
      spyOn(localStorageService, 'get');
      
      ctrl("EditorController", {
            $scope: scope,
            localStorageService: localStorageService
      });
      
      spyOn(scope, 'editor');
      
      expect(localStorageService.get).toHaveBeenCalled();
   }); 
});


