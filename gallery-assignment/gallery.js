(function () {
    if (!String.prototype.trim) {
        (function () {
            var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
            String.prototype.trim = function () {
                return this.replace(rtrim, '');
            };
        })();
    }

    //initialize variables
    var galleryApp = {};
    galleryApp.utils = {},
        galleryApp.elems = {},
        galleryApp.galFns = {},
        galleryApp.galList = [];

    //setup event listeners in utils
    if (typeof window.addEventListener === 'function') {
        galleryApp.utils.addListener = function (el, type, fn) {
            el.addEventListener(type, fn, false);
        };
        galleryApp.utils.removeListener = function (el, type, fn) {
            el.removeEventListener(type, fn, false);
        };
    } else if (typeof document.attachEvent === 'function') {
        galleryApp.utils.addListener = function (el, type, fn) {
            el.attachEvent('on' + type, fn);
        };
        galleryApp.utils.removeListener = function (el, type, fn) {
            el.detachEvent('on' + type, fn);
        };
    } else {
        galleryApp.utils.addListener = function (el, type, fn) {
            el['on' + type] = fn;
        };
        galleryApp.utils.removeListener = function (el, type, fn) {
            el['on' + type] = null;
        };
    }

    var replaceClass = function (clArr, find, replace) {
        if (clArr == "")
            return "selectAll";

        clArr = clArr.split(" ");
        var idx = (clArr.indexOf(find) != -1) ? clArr.indexOf(find) : clArr.length + 1;
        clArr.splice(idx, 1, replace);
        return clArr.join(' ');
    };

    var getTarget = function (evt) {
        evt = evt || window.event;
        return evt.target || evt.srcElement;
    }



    //set elements that will be used
    galleryApp.elems.inputGal = document.getElementById('inputGal');
    galleryApp.elems.galList = document.getElementById('galList');
    galleryApp.elems.selectAll = document.getElementById('selectAll');
    galleryApp.elems.activeView = document.getElementById('activeView');
    galleryApp.elems.expiredView = document.getElementById('expiredView');
    galleryApp.elems.toggleView = document.getElementById('toggleView');
    galleryApp.elems.addNew = document.getElementById('addNew');
    galleryApp.elems.gallery = document.getElementById('gallary');




    galleryApp.galFns.addToGallery = function (evt) {

        var keycode,
            listItem,
            listItemSpan,
            statusBtn,
            deleteBtn;

        //does browser use evt.key or keyCode?
        evt.key ? keycode = evt.key : keycode = evt.keyCode;

        //was the key pressed the enter key?
        if ((keycode === 'Enter' || keycode === 13) && galleryApp.elems.inputGal.value !== '') {

            //push  details to galleryApp.galList array
            galleryApp.galList.push({
                _id: galleryApp.galList.length,
                itemName: galleryApp.elems.inputGal.value,
                completed: false
            });

            console.log(galleryApp.galList);
            //create list item
            listItem = galleryApp.galFns.buildList();

            //create span to hold list item value
            listItemSpan = galleryApp.galFns.buildListSpan();

            //create status button
            statusBtn = galleryApp.galFns.buildStatusBtn();

            //create delete button
            deleteBtn = galleryApp.galFns.buildDeleteBtn();

            //append children of listItem
            listItem.appendChild(statusBtn);
            listItem.appendChild(listItemSpan);
            listItem.appendChild(deleteBtn);

            //append listItem to ul#galList on index page
            galleryApp.elems.galList.appendChild(listItem);

            //reset inputGal
            galleryApp.elems.inputGal.value = '';


        }

    };

    //build a list item
    galleryApp.galFns.buildList = function () {
        var listItem;

        listItem = document.createElement('li');
        listItem.className = 'gal-list-item';
        listItem.classList.add('incomplete');

        return listItem;
    };

    //build a span for text in a list item
    galleryApp.galFns.buildListSpan = function (val) {
        var listItemSpan;

        listItemSpan = document.createElement('span');
        listItemSpan.className = 'list-item-text';
        listItemSpan.innerHTML = val || galleryApp.elems.inputGal.value.trim();

        return listItemSpan;
    };

    //build a status button
    galleryApp.galFns.buildStatusBtn = function () {
        var statusBtn;

        statusBtn = document.createElement('input');
        statusBtn.type = "checkbox";
        statusBtn.className = 'status';


        return statusBtn;
    };

    //build a delete button
    galleryApp.galFns.buildDeleteBtn = function () {
        var deleteBtn;

        deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete';
        deleteBtn.innerHTML = 'X';

        return deleteBtn;
    };

    //build a delete button
    galleryApp.galFns.init = function (arr) {
        //push gallery details to galleryApp.galList array
        var listItem,
            listItemSpan,
            statusBtn,
            deleteBtn;
        for (var i = 0; i < arr.length; i++) {
            galleryApp.galList.push({
                _id: galleryApp.galList.length,
                itemName: arr[i],
                completed: false
            });

            console.log(galleryApp.galList);
            //create list item
            listItem = galleryApp.galFns.buildList();

            //create span to hold list item value
            listItemSpan = galleryApp.galFns.buildListSpan(arr[i]);

            //create status button
            statusBtn = galleryApp.galFns.buildStatusBtn();

            //create delete button
            deleteBtn = galleryApp.galFns.buildDeleteBtn();

            //append children of listItem
            listItem.appendChild(statusBtn);
            listItem.appendChild(listItemSpan);
            listItem.appendChild(deleteBtn);

            //append listItem to ul#galList on index page
            galleryApp.elems.galList.appendChild(listItem);
        }
    };




    //update state of one item to complete or incomplete
    galleryApp.galFns.updateStatus = function (target) {
        var parent,
            listItemText,
            galList = galleryApp.galList;
        target.parentElement ? parent = target.parentElement : target.parentNode;

        listItemText = target.nextElementSibling.innerHTML || target.nextSibling.innerHTML;

        for (var i = 0, l = galList.length; i < l; i++) {
            if (galList[i].itemName === listItemText) {

                galList[i].completed = !galList[i].completed;

                galList[i].completed ?
                    target.parentNode.style.backgroundColor = "gray" :
                    target.parentNode.style.backgroundColor = "white";

                if (galList[i].completed) {
                    parent.classList.add('complete');
                    parent.classList.remove('incomplete');
                } else {
                    parent.classList.add('incomplete');
                    parent.classList.remove('complete');
                }

            }
        }
    };

    galleryApp.galFns.triggerFn = function (evt) {
        var elem = getTarget(evt);
        if (elem.className == "delete") {
            galleryApp.galFns.deleteItem(elem);
        }
        if (elem.type == "checkbox") {
            galleryApp.galFns.updateStatus(elem);
        }
    }



    galleryApp.galFns.selectAll = function (evt) {
        var galList = galleryApp.galList;
        var li = galleryApp.elems.galList.children;
        for (var i = 0; i < li.length; i++) {
            li[i].style.display = "";
        }
    };

    galleryApp.galFns.activeView = function () {
        var galList = galleryApp.galList;
        var li = galleryApp.elems.galList.children;
        for (var i = 0; i < li.length; i++) {
            if (galList[i].completed) {
                li[i].style.display = "none";
            } else {
                li[i].style.display = "";
            }
        }
    };

    galleryApp.galFns.expiredView = function () {
        var galList = galleryApp.galList;
        var li = galleryApp.elems.galList.children;
        for (var i = 0; i < li.length; i++) {
            if (!galList[i].completed) {
                li[i].style.display = "none";
            } else {
                li[i].style.display = "";
            }
        }
    };





    galleryApp.galFns.toggleView = function (evt) {
        var pElem = document.getElementById("galList"),
            find, replace;
        if (pElem.className.indexOf("grid") != -1) {
            find = "grid";
            replace = "list";
        } else {
            find = "list";
            replace = "grid";
        }
        pElem.className = replaceClass(pElem.className, find, replace);
        var elem = getTarget(evt);
        elem.innerHTML = find;
    };
    galleryApp.galFns.addNew = function (evt) {
        document.getElementById("inputGal").style.display = "";
    };



    //delete an item from the list
    galleryApp.galFns.deleteItem = function (target) {
        var parent,
            listItemText,
            galList = galleryApp.galList;

        target.parentElement ? parent = target.parentElement : target.parentNode;

        listItemText = target.previousElementSibling.innerHTML || target.previousSibling.innerHTML;

        //remove delete event listener      

        if (galList.length > 0) {
            //remove from galleryApp.galList array
            for (var i = 0, l = galList.length; i < l; i++) {

                if (galList[i].itemName.indexOf(listItemText) !== -1) {
                    galList.splice(i, 1);
                    parent.remove();
                    break;
                }
            }
        }

    };

 

    galleryApp.utils.addListener(galleryApp.elems.inputGal, 'keyup', galleryApp.galFns.addToGallery);
    galleryApp.utils.addListener(galleryApp.elems.selectAll, 'click', galleryApp.galFns.selectAll);
    galleryApp.utils.addListener(galleryApp.elems.toggleView, 'click', galleryApp.galFns.toggleView);
    galleryApp.utils.addListener(galleryApp.elems.activeView, 'click', galleryApp.galFns.activeView);
    galleryApp.utils.addListener(galleryApp.elems.expiredView, 'click', galleryApp.galFns.expiredView);
    galleryApp.utils.addListener(galleryApp.elems.addNew, 'click', galleryApp.galFns.addNew);
    //
    galleryApp.utils.addListener(galleryApp.elems.gallery, 'click', galleryApp.galFns.triggerFn);

    //initialize with some dummy data
    galleryApp.galFns.init(["J1", "J2", "J3", "J4"]);

}());