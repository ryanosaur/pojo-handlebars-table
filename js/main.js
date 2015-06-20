var data = [
  {
    login: "mojombo",
    id: 1,
    gravatar_id: "",
    url: "https://api.github.com/users/mojombo",
    type: "User",
    site_admin: false
  },
  {
    login: "defunkt",
    id: 2,
    gravatar_id: "",
    url: "https://api.github.com/users/defunkt",
    type: "User",
    site_admin: true
  },
  {
    login: "pjhyett",
    id: 3,
    gravatar_id: "",
    url: "https://api.github.com/users/pjhyett",
    type: "User",
    site_admin: true
  },
  {
    login: "wycats",
    id: 4,
    gravatar_id: "",
    url: "https://api.github.com/users/wycats",
    type: "User",
    site_admin: false
  }
];


$(document).ready(function() {
var headSource   = $("#header-template").html();
var template = Handlebars.compile(headSource);
var headContext = { data: data[0] };
var headHtml = template(headContext);

var source   = $("#entry-template").html();
var template = Handlebars.compile(source);
var context = { data: data };
var html    = template(context);

  // $(".container").tableizer({ data: data, search: true });
  $(".container1").html(headHtml);
  $(".table").append(html);

  console.log(headHtml);
});