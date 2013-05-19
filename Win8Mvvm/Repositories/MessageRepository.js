(function() {
    "use strict";

    var messageRepository = function() {

        var self = this;

        self.retrieveAll = function () {
            
            return [
                
                new Models.Message("Hello World"),
                new Models.Message("Good bye pork pie"),
                new Models.Message("Hello Tuesday")
            ];
        };
    };
    
    WinJS.Namespace.define("Repositories", { MessageRepository: messageRepository });
})();

