$.fn.tableizer = function(options) {
  var data = options.data;
  var search = options.search;

  this.each(function(i, e) {
    var $table = $("<table class='table'><thead class='table-head'> <tr> </tr> </thead> <tbody class='table-body'> </tbody> </table>");

    var userKeys = Object.keys(data[0]);
    var $headers = userKeys.map(function(e, i) {
      return $("<th>", { text: e, class: "header", data: { direction: 'asc' }  })
    });

    $table.find("thead tr").html($headers);
    var sortData = {
      asc: { opposite: 'desc', direction: -1 },
      desc: { opposite: 'asc', direction: 1 },
    }
    var directionKey;
    $table.on("click", "thead th", function() {
      var $th = $(this);
      directionKey = $th.data("direction");
      $th.data("direction", sortData[directionKey].opposite);
      var keyForSort = $th.text();
      data.sortUsing(keyForSort, sortData[directionKey].direction);
      redrawTheTableBody(data);
    });

    $(e).html($table);

    if (search) {
      drawSearchBox();
    }

    function redrawTheTableBody(data) {
      var $rows = data.map(function(user) {
        var $rowData = userKeys.map(function(key, i) {
          return $("<td>", { text: user[key], class: "data-value" })
        });
        return $("<tr></tr>").html($rowData);
      });

      $(e).find("tbody").html($rows);
    }

    function drawSearchBox() {
      var $input = $('<input id="search-box" type="text" placeholder="Search ..." class="form-control">');
      var timerId;
      $input.keyup(function() {
        var searchPhrase = this.value;
        clearTimeout(timerId);
        timerId = setTimeout(function() {
          var filteredData = data.filter(function(user) {
            return userKeys.some(function(key) {
              return user[key].toString().match(searchPhrase);
            });
          });
          redrawTheTableBody(filteredData);
        }, 300);
      });
      $(e).prepend($input);
    }

    redrawTheTableBody(data);
  });
};

Array.prototype.sortUsing = function(key, direction) {
  this.sort(function(a,b) {
    if (a[key] === b[key]) {
      return 0;
    }
    return direction * (a[key] > b[key] ? 1 : -1);
  });
}