export function loadHeader() {
  fetch("../src/layout/header.html")
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("header").innerHTML = html;
    })
    .catch((error) => console.error("Error loading header:", error));
}

export function loadNav() {
  fetch("../src/layout/nav.html")
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("nav").innerHTML = html;
    })
    .catch((error) => console.error("Error loading nav:", error));
}
