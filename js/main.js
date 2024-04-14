//top-nav / slide sidebar menu
function slideMenuHandler(e) {
  const slideOpenBtn = document.querySelector(".top-nav-modal");
  const slideCloseBtn = document.querySelector(".category-close");
  const slideMenu = document.querySelector(".top-nav-category");

  const target = e.target;
  const parentTarget = e.target.parentNode;
  const activetarget = e.currentTarget.document.activeElement;

  if (parentTarget === slideOpenBtn) {
    slideMenu.classList.add("open");
  } else if (activetarget === slideCloseBtn || target !== slideMenu) {
    slideMenu.classList.remove("open");
  }
}

window.addEventListener("click", slideMenuHandler);

//top-nav / scroll detect
function scrollControll() {
  const topNav = document.querySelector(".top-nav");
  const topScroll = document.documentElement.scrollTop;
  topScroll
    ? topNav && topNav.classList.add("back-color")
    : topNav.classList.remove("back-color");
}

window.addEventListener("scroll", scrollControll);
