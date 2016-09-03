/**
 * Created by Garegin on 30.08.2016.
 * For tutu.ru frontend js test.
 */

//=============================================== table settings: ====================================================//

const BIG_DATA_SRC = 'http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&la' +
    'stName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&adress=%7BaddressObject%7D&description=%7Blorem%7C32%7D';
const SMALL_DATA_SRC = 'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%' +
    '7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&adress=%7BaddressObject%7D&description=%7Blorem%7C32%7D';
const ROWS_PER_PAGE = 50;


var user = []; // array of objects parsed from *size*_DATA_SRC
var userF = []; // user array after filter
var userFP = []; // user array after filter & pagination
var sortedField = {"id": "id", "order": "asc"};
var filter = ""; // current filter string
var curPage = 1; // current page number
var pCount = 1; // total page count
var hoveredEl = {}; // remember hovered element

//============================================== primary functions: ==================================================//

// data size trigger:
function loadTable(dataSize) {
    switch (dataSize) {
        case "big":
            loadUserData(BIG_DATA_SRC);
            break;
        case "small":
            loadUserData(SMALL_DATA_SRC);
            break;
        default:
            return false;
    }
}
// loading data from src and handling:
function loadUserData(src) {
    $('#user-table').fadeOut();
    setProgressBar(20);
    var percent = 20;
    var progress = setInterval(function () {
        setProgressBar(percent < 80 ? ++percent : percent);
    }, 200);
    $("[name='data-size-checkbox']").bootstrapSwitch('readonly', true);
    $.get(src)
        .done(function (data) {
            $('#user-table').fadeIn();
            setProgressBar(100);
            clearInterval(progress);
            $("[name='data-size-checkbox']").bootstrapSwitch('readonly', false);
            formTable(parseUserData(data), sortedField.id, sortedField.order);
        })
        .fail(function () {
            alert("Can't load data from server (probably busy). Try again later.");
            setProgressBar(0);
        });
}
// forming user:
function parseUserData(data) {
    for (var i = 0; i < data.length; i++) {
        user[i] = {};
        user[i].id = data[i].id;
        user[i].firstName = data[i].firstName;
        user[i].lastName = data[i].lastName;
        user[i].email = data[i].email;
        user[i].phone = data[i].phone;
        user[i].adress = data[i].adress;
        user[i].description = data[i].description;
    }
    userF = _.clone(user);
    return userF;
}

// general table forming function (consider sort, filtering and pagination):
function formTable(user, field, order) {
    var userTableBody = $('#user-table-body');
    userTableBody.empty();
    pCount = _.ceil(user.length / ROWS_PER_PAGE);
    copyArrayByVal(user, _.sortBy(user, field));
    copyArrayByVal(userFP, user);
    filterLetCurPageUsers(userFP);
    for (var i = 0; i < userFP.length; i++) {
        var iOrdered = order === 'asc' ? i : userFP.length - 1 - i;
        formTableRow(i, userFP[iOrdered], filter);
    }
    setArrowDirection(sortedField.id, sortedField.order);
    createPagButtons();
}

// forming table rows:
function formTableRow(rowNum, user) {
    var userTableBody = $('#user-table-body');
    var userNum = sortedField.order === 'asc' ? rowNum : userFP.length - 1 - rowNum;
    userTableBody.append('<tr data-userNum="' + userNum + '" onclick="showUserInfo(this, ' + userNum + ')"></tr>');
    var tRow = userTableBody.find('tr:nth(' + rowNum + ')');
    tRow.append('<td>' + user.id + '</td>' +
        '<td>' + user.firstName + '</td>' +
        '<td>' + user.lastName + '</td>' +
        '<td>' + user.email + '</td>' +
        '<td>' + user.phone + '</td>');
    // sticky hover:
    if (_.isElement(hoveredEl.elem)){
        var userTable = $('#user-table');
        if (userTable.find('tr').last()[0].innerHTML === $(hoveredEl.elem)[0].innerHTML){
            userTable.find('tr').last().addClass('hovered');
        }
    }
}

//============================================== filtering: ==========================================================//

// filtering table:
function filterTable(user) {
    var filterValue = $('#filter').val();
    if (filter !== filterValue) {
        copyArrayByVal(user, this.user); // copy one array to another by-val
        filter = filterValue;
    }
    filterUser(user);
    curPage = 1;
    formTable(user, sortedField.id, sortedField.order);
}

// filtering user array of objects:
function filterUser(user) {
    var deleteList = [];
    for (var i = 0; i < user.length; i++) {
        if (!isValidUser(user[i], filter)) {
            deleteList.push(i);
        }
    }
    _.pullAt(user, deleteList);
}

// filtering single user object:
function isValidUser(user, filter) {
    filter = _.trim(filter);
    if (filter === undefined || filter === '') {
        return true;
    }
    if (user.id.toString().indexOf(filter) !== -1) {
        return true;
    }
    if (user.firstName.indexOf(filter) !== -1) {
        return true;
    }
    if (user.lastName.indexOf(filter) !== -1) {
        return true;
    }
    if (user.email.indexOf(filter) !== -1) {
        return true;
    }
    return user.phone.indexOf(filter) !== -1;
}

//============================================== pagination: =========================================================//

// adding navigation buttons on page:
function createPagButtons() {
    var pagination = $('.pagination-container');
    if (pCount <= 1) {
        pagination.parent().hide();
        pagination.empty();
    } else {
        pagination.parent().show();
        pagination.empty();
        pagination.append('<li><a onclick="goToPrevPage()">&laquo;</a></li>');
        for (var i = 1; i <= pCount; i++) {
            pagination.append('<li><a onclick="goToPage(' + i + ')">' + i + '</a></li>');
        }
        pagination.append('<li><a onclick="goToNextPage()">&raquo;</a></li>');

        pagination.find('a:eq(' + curPage + ')').toggleClass("hovered");
    }
}

// user array page filter:
function filterLetCurPageUsers(user) {
    if (pCount !== 1) {
        copyArrayByVal(user, user.slice((curPage - 1) * ROWS_PER_PAGE, curPage * ROWS_PER_PAGE));
    }
}

// go to page:
function goToPage(pageN) {
    curPage = pageN;
    formTable(userF, sortedField.id, sortedField.order);
}

// go next page:
function goToNextPage() {
    if (curPage === pCount) {
        curPage = 0;
    }
    curPage++;
    formTable(userF, sortedField.id, sortedField.order);
}

// go previous page:
function goToPrevPage() {
    if (curPage === 1) {
        curPage = pCount + 1;
    }
    curPage--;
    formTable(userF, sortedField.id, sortedField.order);
}

//=============================================== sorting: ===========================================================//

// table sort:
function sortTable(e) {
    // Defining field and sort order:
    if (_.isEmpty(sortedField)) {
        sortedField = {"id": e.id, "order": "asc"};
    } else if (sortedField.id === e.id) {
        sortedField.order = sortedField.order === "asc" ? "desc" : "asc";
    } else {
        sortedField = {"id": e.id, "order": "asc"};
    }
    formTable(userF, sortedField.id, sortedField.order);
}

// set graphic element with sort direction info:
function setArrowDirection(field, order) {
    $('#id').text('id');
    $('#firstName').text('firstName');
    $('#lastName').text('lastName');
    $('#email').text('email');
    $('#phone').text('phone');
    order = (order === "asc") ? ' ▼' : ' ▲';
    $('#' + field).text(field + order);
}

//============================================== additional: =========================================================//

// additional info panel:
function showUserInfo(e, userNum) {
    $('#user-table-body').find('.hovered').removeClass('hovered');
    $('#additional-info').fadeIn();
    $('#user-name').empty().append(userFP[userNum].firstName + " " + userFP[userNum].lastName);
    $('#user-description').empty().append(userFP[userNum].description);
    $('#user-address').empty().append(userFP[userNum].adress.streetAddress);
    $('#user-city').empty().append(userFP[userNum].adress.city);
    $('#user-state').empty().append(userFP[userNum].adress.state);
    $('#user-zip').empty().append(userFP[userNum].adress.zip);
    $(e).addClass("hovered");
    if (!_.isEqual(hoveredEl.elem, e)) {
        hoveredEl.elem = e;
    }

}

//=============================================== helper functions: ==================================================//

function setProgressBar(percent) {
    $('.progress-bar').css('width', percent.toString() + '%');
}

function copyArrayByVal(destArray, srcArray) {
    _.remove(destArray); // clear array not losing its identity (primal reference)
    _.assign(destArray, srcArray); // copy one array to another by-val
}

//============================================== setting up events: ==================================================//

$(function () {
    // primary page load:
    loadTable('small');
    $("[name='data-size-checkbox']").bootstrapSwitch();
    // switching data size:
    $("input[name='data-size-checkbox']").on('switchChange.bootstrapSwitch', function (event, state) {
        //reset table settings on new data load:
        user = [];
        userF = [];
        sortedField = {"id": "id", "order": "asc"};
        filter = "";
        curPage = 1;
        pCount = 1;
        loadTable(state ? 'small' : 'big');
        $('#additional-info').fadeOut();
    });
    // press enter on input field to filter:
    $('#filter').keypress(function (e) {
        if (e.keyCode == 13) {
            filterTable(userF);
        }
    });
});

//====================================================================================================================//








