(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/home/home.html", {

        ready: function (element, options) {

            var viewModel = new ViewModels.MessageViewModel(new Repositories.MessageRepository());
            Mvvm.dataContext(viewModel);
            
            var listControl = $("#messageList")[0].winControl;
            listControl.onselectionchanged = showEditAndRemoveOptions;
            $("#update").click(editListItem);
            $("#delete").click(deleteListItem);

            function showEditAndRemoveOptions() {
                
                $("#displayEditAndRemoveOptions").show();
                listControl.selection.getItems().done(function (items) {
                    
                    if(items.length)
                        $("#editItem").val(items[0].data.Body);
                });
            }
            
            function editListItem () {
                
                var selectedIndex = listControl.selection.getIndices()[0];
                viewModel.editListItem($("#editItem").val(), selectedIndex);
                $("#displayEditAndRemoveOptions").hide();
            }
            
            function deleteListItem() {
                
                var selectedIndex = listControl.selection.getIndices()[0];
                viewModel.deleteListItem(selectedIndex);
                $("#displayEditAndRemoveOptions").hide();
            }
        }
    });
})();
