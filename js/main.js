var Table = {};
Table.data = [
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

Table.ready = function() {
  if (document.readyState != 'loading'){
    Table.tableizer();
  } else {
    document.addEventListener('DOMContentLoaded', Table.tableizer);
  }
}

Table.tableizer = function() {
  // var array = [document.getElementById('container')];
  // array.tableizer({ data: Table.data, search: true });
};

Table.ready();
