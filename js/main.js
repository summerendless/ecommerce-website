

//top-nav / scroll detect
function scrollControll() {
  const topNav = document.querySelector(".top-nav");
  const topScroll = document.documentElement.scrollTop;
  topScroll
    ? topNav && topNav.classList.add("back-color")
    : topNav.classList.remove("back-color");
}

window.addEventListener("scroll", scrollControll);


