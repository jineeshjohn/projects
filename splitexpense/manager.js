var DataModel = (function (document, DataModel) {
    var billList;
    var friendList;
    DataModel.getBillList = function () {
        return billList;
    };

    DataModel.getFriendList = function () {
        return friendList;
    };

    if (localStorage.getItem("billList")) {
        billList = JSON.parse(localStorage.getItem("billList"));
    } else {
        billList = {};
    }

    if (localStorage.getItem("friendList")) {
        friendList = JSON.parse(localStorage.getItem("friendList"));
    } else {
        friendList = {};
    }



    DataModel.addNewBill = function (description, friendNames, amountOwed) {
        var tempBill = {};

        tempBill.amountOwed = amountOwed;
        tempBill.amountPaid = 0;
        for (var i = 0; i < friendNames.length; i++) {
            var billListId = friendNames[i] + '__' + description;
            billList[billListId] = tempBill;

            var userBills = friendList[friendNames[i]];
            if (userBills.indexOf(billListId) == -1) {
                userBills.push(billListId);
            }
            friendList[friendNames[i]] = userBills;
        }

        DataModel.syncLocalStorage();
    };

    DataModel.removeBill = function (friendName, description) {
        var billListId = friendName + '__' + description;

        delete billList[billListId];
        friendList[friendName].splice(friendList[friendName].indexOf(billListId), 1);
        DataModel.syncLocalStorage();
    };

    DataModel.editBillItem = function (billListId, amountPaid) {
        billList[billListId].amountPaid = amountPaid;
        DataModel.syncLocalStorage();
    };

    DataModel.addNewFriend = function (name) {
        this.getFriendList()[name] = [];
        DataModel.syncLocalStorage();
    };
    DataModel.editFriend = function (node) {
        var name = node.innerHTML;
        node.parentNode.removeChild(node);
        var fList = this.getFriendList();
        delete fList[name];
        DataModel.syncLocalStorage();
    };
    DataModel.removeFriend = function (node) {
        var name = node.innerHTML;
        node.parentNode.removeChild(node);
        var fList = this.getFriendList();
        delete fList[name];
        DataModel.syncLocalStorage();
    };

    DataModel.syncLocalStorage = function () {
        localStorage.setItem("billList", JSON.stringify(DataModel.getBillList()));
        localStorage.setItem("friendList", JSON.stringify(DataModel.getFriendList()));
    };


    return DataModel;
})(document, DataModel || {});


DataModel.syncLocalStorage();

var Manager = (function (document, Manager) {

    Manager.start = function () {
        Manager.renderFriendsList();
    };

    Manager.renderFriendsList = function () {
        var friendList = DataModel.getFriendList();
        var placeholder = document.getElementById("friendListTable");
        var firstName;
        for (firstName in friendList) break;

        var innerString = "";

        for (var key in friendList) {
            innerString = innerString + "<li>" + key + "</li>";
        }

        placeholder.innerHTML = innerString;
        if (firstName) {
            Manager.renderBillsList(firstName);
        }
    }
    Manager.renderBillsList = function (friendName) {
        var friendList = DataModel.getFriendList();
        var billsListFromDataModel = DataModel.getBillList();
        var placeholder = document.getElementById("billListTable");
        if (friendName == "") {
            for (friendName in friendList) break;
        }
        document.getElementById("billListUserName")
            .innerHTML = friendName + "'s Bills"
        var billListArray = friendList[friendName];
        var innerString = "<table cellspacing='0' cellpadding='0'><tr><th>Description</th><th>Amount Paid </th></tr>";

        for (var i = 0; i < billListArray.length; i++) {
            var billListID = billListArray[i];
            var name = billListID.split("__")[0];
            var billDesc = billListID.split("__")[1];
            innerString = innerString + "<tr><td>" + billDesc + "</td><td>" + billsListFromDataModel[billListID].amountOwed + "</td> </tr>";

        }
        placeholder.innerHTML = innerString;

    }


    return Manager;
})(document, Manager || {});

var PopUp = function (options) {
    var me = this;
    this.source = options.source;
    this.title = options.title;
    this.container = null;
    this.closeCallBack = options.closeCallBack;

    this.render = function () {
        var sourceInnerHtml = document.getElementById(this.source)
            .innerHTML;

        var popupHtml = "<div class='PopUp'><div class='PopUpHdr'><span class='floatLeft' >" + this.title +
            "</span><div id='popupClose' class='floatRight'>X</div><div class='clearBoth'></div></div><div class='modalPopupBdy'>" +
            sourceInnerHtml +
            "</div><div> <input id='ok' type='button' value='OK'></div></div>";

        this.container = document.createElement("div");
        this.container.setAttribute("class", "popupOverLay");
        this.container.innerHTML = popupHtml;
        document.body.appendChild(this.container);

        document.getElementById("popupClose")
            .addEventListener("click", function (evt) {
                me.remove();
            });

        document.getElementById("ok")
            .addEventListener("click", function (evt) {
                me.closeCallBack();
            });

    };
    this.show = function () {
        this.render();
    };

    this.remove = function () {
        document.body.removeChild(me.container);
    }
};

(function () {

    Manager.start();
    var newAddFriendPopup;
    document.getElementById("addFriend")
        .addEventListener("click", function (evt) {
            newAddFriendPopup = new PopUp({
                source: "addFriendTmpl",
                title: "Add New Friend",
                closeCallBack: saveNewFriend
            });
            newAddFriendPopup.show()
        });
    document.getElementById("removeFriend")
        .addEventListener("click", function (evt) {
            var friendsList = document.querySelectorAll(".selectedFriend");
            if (friendsList.length != 0) {
                for (var i = 0; i < friendsList.length; i++) {
                    DataModel.removeFriend(friendsList[i]);
                }
            }
        });


    document.getElementById("friendListTableA")
        .addEventListener("dblclick", function (evt) {
            if (evt.target.tagName == "LI") {
                var node = evt.target;
                var elem = document.createElement("input");
                elem.type = "text";
                elem.value = node.innerHTML;
                node.innerHTML = "";
                node.appendChild(elem);
                setTimeout(function () {
                    elem.focus();
                }, 100);
            }
        });
    document.getElementById("friendListTableA")
        .addEventListener("blur", function (evt) {
            evt.preventDefault();
            if (evt.target.tagName == "INPUT") {
                var node = evt.target;
                if (node.value == "") {
                    alert("Name must be valid and unique");
                } else {
                    DataModel.addNewFriend(node.value);
                    node.parentNode.innerHTML = node.value;
                    setTimeout(function () {
                        if (node.parentNode)
                            node.parentNode.removeChild(node);
                    }, 100);
                }
            }
        }, true);



    function saveNewFriend() {
        var friendName = document.getElementById("inputFriend")
            .value;

        if (friendName == "") {
            alert("Please enter friend name")
        } else {
            DataModel.addNewFriend(friendName);
            Manager.renderFriendsList();
            newAddFriendPopup.remove();
        }



    }

    document.getElementById("friendListTable")
        .addEventListener("click", function (evt) {
            if (evt.target.tagName == "LI") {
                evt.target.className = "selectedFriend";
                Manager.renderBillsList(evt.target.innerHTML);
            }
        });

    var newAddBillPopup;

    document.getElementById("addNewBill")
        .addEventListener("click", function (evt) {
            var friendList = DataModel.getFriendList();
            if (Object.keys(friendList)
                .length == 0) {
                alert("Please add atleast one User!!!!");
            } else {
                newAddBillPopup = new PopUp({
                    source: "addNewBillTmpl",
                    title: "Add New Bill",
                    closeCallBack: saveNewBill
                });

                newAddBillPopup.show();

                var friendsSelectBox = document.getElementById("friendsSelectDiv");
                var selectInnerStr = "<table cellspacing='0' cellpadding='0'><tr><th>Friends</th><th>%</th></tr>";
                for (var key in friendList) {
                    selectInnerStr = selectInnerStr + "<tr><td><input type='checkbox' value='" + key + "'>" + key + "</td><td>Todo - (Avg contribution)</td></tr>";

                }
                selectInnerStr = selectInnerStr + "</table>";

                friendsSelectBox.innerHTML = selectInnerStr;
            }

        });

    function saveNewBill() {
        var description = document.getElementById("inputBillDesc")
            .value;
        var amountOwed = document.getElementById("inputBillAmountOwed")
            .value;

        var selectOptions = document.getElementById("friendsSelectDiv")
            .querySelectorAll("input:checked");

        if (description == "") {
            alert("Please enter Description");
        } else if (amountOwed == "") {
            alert("Please enter Amountowed");

        } else {
            var optionSelected = false;
            var selectedNamesArray = [];
            for (var i = 0; i < selectOptions.length; i++) {
                selectedNamesArray.push(selectOptions[i].value);
            }

            if (selectOptions.length == 0) {
                alert("Select atleast one Friend")
            } else {
                DataModel.addNewBill(description, selectedNamesArray, amountOwed);
                Manager.renderBillsList("");
                newAddBillPopup.remove();
            }
        }
    }
})()