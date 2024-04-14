// //top-nav / slide sidebar menu
// function slideMenuHandler(e) {
//   const slideOpenBtn = document.querySelector(".top-nav-modal");
//   const slideCloseBtn = document.querySelector(".category-close");
//   const slideMenu = document.querySelector(".top-nav-category");

//   const target = e.target;
//   const parentTarget = e.target.parentNode;
//   const activetarget = e.currentTarget.document.activeElement;

//   if (parentTarget === slideOpenBtn) {
//     slideMenu.classList.add("open");
//   } else if (activetarget === slideCloseBtn || target !== slideMenu) {
//     slideMenu.classList.remove("open");
//   }
// }

// window.addEventListener("click", slideMenuHandler);

//top-nav / scroll detect
function scrollControll() {
  const topNav = document.querySelector(".top-nav");
  const topScroll = document.documentElement.scrollTop;
  topScroll
    ? topNav && topNav.classList.add("back-color")
    : topNav.classList.remove("back-color");
}

window.addEventListener("scroll", scrollControll);

// header markup data include
// async function getFile() {
//   let myPromise = new Promise(function(resolve) {
//     let req = new XMLHttpRequest();
//     req.open('GET', "header.html");
//     req.onload = function() {
//       if (req.status == 200) {
//         resolve(req.response);
//       } else {
//         resolve("File not Found");
//       }
//     };
//     req.send();
//   });
//   document.getElementById("header").innerHTML = await myPromise;
// }

// getFile();


//JSON fetch
// async function loadItems() {
//   const response = await fetch("./data/data.json");
//   const json = await response.json();
//   return json.itemsBox;
// }

// //list of goods
// function displayItems(itemsBox, currentPageNum) {
//   const itemContainer = document.querySelector(".goods-container");
//   const pageBtns = document.querySelectorAll(".page-btn");

//   //data slice
//   let dataPerPage = 6;
//   let startIndexItem = currentPageNum - 1;

//   let pageShowBox = itemsBox.slice(
//     dataPerPage * startIndexItem,
//     dataPerPage * currentPageNum
//   );

//   //data print
//   if (itemContainer !== null) {
//     itemContainer.innerHTML = pageShowBox
//       .map((item) => createHTML(item))
//       .join("");
//   }

//   //pageBtn active
//   pageBtns.forEach((pageBtn) => {
//     const pageNum = parseInt(pageBtn.innerHTML);
//     if (pageNum === currentPageNum) {
//       pageBtn.classList.add("active");
//     } else {
//       pageBtn.classList.remove("active");
//     }
//   });
// }

//createHTML
// export function createHTML(item) {
//   return `
//     <li class="goods-card">
//       <a href=detail.html?${item.id} class="card-icon more-icon">
//         <div class="card-img-box">
//           <img src="${item.image}" alt="${item.productName}" class="card-img">
//         </div>
//       </a>
//       <div class="card-info">
//         <div class="card-title">
//           <p>${item.productName}</p>
//         </div>
//         <div class="card-precis">
//             <span class="card-price">${item.price.toLocaleString()}</span>
//             <button type="button" data-id=${
//               item.id
//             } class="card-icon cart-icon"><i class='bx bx-cart'></i></button>
//         </div>               
//       </div>
//     </li>
// `;
// }

//pagination paint
// function pagination(itemsBox) {
//   const pageContainer = document.querySelector(".goods-pagination");

//   let pageArray = [];
//   let totalCount = itemsBox.length;
//   let totalPage = Math.ceil(totalCount / 6);
//   let currentPage = 1;

//   for (let i = 1; i <= totalPage; i++) {
//     pageArray.push(i);
//   }

//   if (pageContainer !== null) {
//     pageContainer.innerHTML = pageArray
//       .map((num) => paginationHTML(num))
//       .join("");
//   }

//   function pageData(e) {
//     if (e.target.tagName === "BUTTON") {
//       let currentPage = parseInt(e.target.innerHTML);

//       displayItems(itemsBox, currentPage);
//     }
//   }

//   pageContainer && pageContainer.addEventListener("click", pageData);

//   displayItems(itemsBox, currentPage);
// }

// //pagination - html
// function paginationHTML(num) {
//   return `
//   <li class="page-list">
//     <button type="button" class="page-btn">${num}</button>
//   </li>
//   `;
// }

// //user selected 
// function selectHandler(itemsBox) {
//   const sortContainer = document.querySelector(".goods-sort");
//   if (sortContainer !== null) {
//     sortContainer.addEventListener("change", (e) =>
//       selectFilter(e, itemsBox)
//     );
//   }
// }

// // filtering
// function selectFilter(e, itemsBox) {
//   const choiceSortBox = e.target;
//   const userChoice =
//     choiceSortBox.options[choiceSortBox.selectedIndex].dataset;
//   const userSelect = itemsBox.filter(
//     (item) => item[userChoice.key] === userChoice.value
//   );
//   pagination(userSelect);
// }
// getFile()
//   .then(() => {
//     return loadItems();
//   })
//   .then((itemBox) => {
//     pagination(itemBox);
//     selectHandler(itemBox);
//   });
