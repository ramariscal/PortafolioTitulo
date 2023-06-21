document.addEventListener("DOMContentLoaded", function () {
  const usernamePlaceholder = document.getElementById("username-placeholder");
  const loggedIn = localStorage.getItem("loggedIn");
  const username = localStorage.getItem("username");

  if (loggedIn && username) {
    usernamePlaceholder.textContent = username;
  }
});
