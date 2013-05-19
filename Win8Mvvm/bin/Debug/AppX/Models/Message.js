(function () {

    "use strict";

    var message = function (name) {

        this.Body = name;
    };

    WinJS.Namespace.define("Models", { Message: message });
})();

