Array.prototype.tableizer = function(options) {
  var data = options.data;
  var search = options.search;

  this.forEach(function(e) {
    var dataKeys = Object.keys(data[0]);
    var headerSource = _helper.id("header-template").innerHTML;
    var headerTemplate = Handlebars.compile(headerSource);
    var header = headerTemplate({ data: data[0] });

    var bodySource = _helper.id("body-template").innerHTML;
    var bodyTemplate = Handlebars.compile(bodySource);
    var body = bodyTemplate({ data: data });

    var addSource = _helper.id("add-row-template").innerHTML;
    var addTemplate = Handlebars.compile(addSource);
    var add = addTemplate({ data: data[0] });

    _helper.id("container").innerHTML = header;
    _helper.klass("table-body")[0].innerHTML = body;
    _helper.id("add-container").innerHTML = add;

    var $table = _helper.klass('table')[0];

    var sortData = {
      asc: { opposite: 'desc', direction: -1 },
      desc: { opposite: 'asc', direction: 1 }
    }
    var directionKey;
    Array.prototype.forEach.call(_helper.klass('header'), function(header){
      header.addEventListener("click", function() {
        var th = this;
        directionKey = th.getAttribute("data-direction");
        th.setAttribute("data-direction", sortData[directionKey].opposite);
        var keyForSort = th.textContent;
        data.sortUsing(keyForSort, sortData[directionKey].direction);
        redrawTheTableBody(data);
      });
    });

    _helper.id('add-row').addEventListener('submit', function(e){
      e.preventDefault();
      var newRow = {};
      dataKeys.forEach(function(key){
        var input = _helper.id('add-box-' + key);
        var value = input.value;
        input.value = '';
        newRow[key] = value;
      });
      data.push(newRow);
      redrawTheTableBody(data);
      return false;
    });

    if (search) {
      var searchContainer = _helper.id('search-container');
      _helper.removeClass(searchContainer, 'hidden');
      drawSearchBox();
    }

    function redrawTheTableBody(data) {
      var body = bodyTemplate({ data: data });
      _helper.klass("table-body")[0].innerHTML = body;
    }

    function drawSearchBox() {
      input = _helper.id('search-box');
      var timerId;
      input.addEventListener('keyup', function() {
        var searchPhrase = this.value;
        clearTimeout(timerId);
        timerId = setTimeout(function() {
          var filteredData = data.filter(function(user) {
            return dataKeys.some(function(key) {
              return user[key].toString().match(searchPhrase);
            });
          });
          redrawTheTableBody(filteredData);
        }, 300);
      });
    }
  });
};

var _helper = {};

_helper.id = function(id){
  return document.getElementById(id);
}

_helper.klass = function(klass){
  return document.getElementsByClassName(klass);
}

_helper.removeClass = function(el, className){
  if (el.classList)
    el.classList.remove(className);
  else
    el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
}

Array.prototype.sortUsing = function(key, direction) {
  this.sort(function(a,b) {
    if (a[key] === b[key]) {
      return 0;
    }
    return direction * (a[key] > b[key] ? 1 : -1);
  });
}
