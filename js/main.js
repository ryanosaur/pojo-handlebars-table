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
  $(".container").tableizer({ data: data, search: true });
});