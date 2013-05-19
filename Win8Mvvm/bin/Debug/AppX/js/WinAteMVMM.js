var Mvvm = (function () {

    var evts = {};
    var self = this;
    
    self.notify = function (prop) {
        
        var elementData = evts[prop];
        elementData.el[elementData.attribute] = vm[prop];
    };

    self.dataContext = function (vm) {

        self.vm = vm;
        self.vm.propertyChanged = self.notify;
        var elsWithBonding = $("[data-bondage]");

        $.each(elsWithBonding, function (key, val) {
            
            var split = $(val).attr("data-bondage").split(":");
            var vmProp = $.trim(split[1]);
            var elAttr = $.trim(split[0]);
            
            if (elAttr.indexOf(".") != -1) {

                bindToAttributeChild(val, elAttr, vmProp);
            }
            else if (vmProp.indexOf(",") != -1) {
                vmProp = setUpTwoWayBinding(val, elAttr, vmProp);
            }
            else
                val[elAttr] = self.vm[vmProp];

            evts[vmProp] = { el: val, attribute: elAttr };
        });
    };

    var setUpTwoWayBinding = function (el, attr, vmProp) {
        
        var vmPropInfo = vmProp.split(",");
        vmProp = $.trim(vmPropInfo[0]);
        if ($.trim(vmPropInfo[1]) == "TwoWay") {
            
            el.onchange = function () {
                
                self.vm[vmProp] = $(el).val();
            };
            el[attr] = self.vm[vmProp];
        }
        return vmProp;
    };

    var bindToAttributeChild = function (el, attr, vmProp) {
        
        var split1 = attr.split(".");
        attr = split1[0];
        el[attr][split1[1]] = self.vm[vmProp];
    };

    return this;
})();



