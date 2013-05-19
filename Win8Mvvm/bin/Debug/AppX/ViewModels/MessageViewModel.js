(function () {
    "use strict";

    var messageViewModel = function (messageRepository) {

        var self = this;
        var theText = "";
        var messageList = null;

        Object.defineProperty(self, "textEntry", {
            get: function () {
                return theText;
            },
            set: function (val) {
                theText = val;
                self.propertyChanged("textEntry");
            }
        });

        Object.defineProperty(self, "messageDataSource", {
            get: function () {
                messageList = new WinJS.Binding.List(messageRepository.retrieveAll());
                return messageList.dataSource;
            }
        });

        self.propertyChanged = null;

        self.addMessageCommand = function () {
            messageList.push(new Models.Message(self.textEntry));
        };

        self.deleteListItem = function(selectedIndex) {
            messageList.splice(selectedIndex, 1);
        };

        self.editListItem = function(data, selectedIndex) {
            messageList.setAt(selectedIndex, new Models.Message(data));
        };
    };

    WinJS.Namespace.define("ViewModels", { MessageViewModel: messageViewModel });
})();


