import {
  totalCartCount,
  loadCart,
  paintCartPage,
  saveCartGoods,
  Item,
  Categories
} from "./cartPage.js";
import { loadDetail } from "./detailPage.js";

//header, footer markup data include
async function asyncMarkupData() {
  const allElements = document.getElementsByTagName("*");
  Array.prototype.forEach.call(allElements, function (el) {
    const includePath = el.dataset.includePath;
    if (includePath) {
      const xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          el.outerHTML = this.responseText;
        }
      };
      xhttp.open("GET", includePath, true);
      xhttp.send();
    }
  });
}

// localStrage에 cart goods가 존재하는지 체크
// function storageCheck(json, saveGoods, mode) {
//   if (saveGoods) {
//     for (let i = 0; i < json.data.length; i++) {
//       saveGoods.forEach((goods) => {
//         if (goods.product_id === json.data[i].product_id) {
//           json.data[i][mode] = true;
//         }
//       });
//     }
//   }
// }

//JSON fetch
async function loadItems() {
  const response = await fetch("http://44.217.200.27/ecommerce/api/read.php");
  const json = await response.json();
  console.log(json)
  // storageCheck(json, saveWishGoods, "wish");
  //storageCheck(json, saveCartGoods, "cart");
  console.log(json.data)
  let items = [];
  json.data.forEach(element => {
    let item = new Item(element.product_id, element.product_name, element.unit_price, "./assets/"+element.image, element.in_stock, element.category, element.unit_quantity);
    items.push(item)
  });
  return items;
}

//list print
function displayItems(itemsBox, currentPageNum) {
  const itemContainer = document.querySelector(".goods-container");
  const pageBtns = document.querySelectorAll(".page-btn");

  //data slice
  let dataPerPage = 6;
  let startIndexItem = currentPageNum - 1;

  let pageShowBox = itemsBox.slice(
    dataPerPage * startIndexItem,
    dataPerPage * currentPageNum
  );

  //data print
  if (itemContainer !== null) {
    itemContainer.innerHTML = pageShowBox
      .map((item) => createHTML(item))
      .join("");
  }

  //pageBtn active
  pageBtns.forEach((pageBtn) => {
    const pageNum = parseInt(pageBtn.innerHTML);
    if (pageNum === currentPageNum) {
      pageBtn.classList.add("active");
    } else {
      pageBtn.classList.remove("active");
    }
  });
  loadCart(itemsBox);
}

//createHTML
export function createHTML(item) {
  let stockStatus;
  const infoStock = document.querySelector(".info-stock");
  stockStatus = item.in_stock;
  return `
    <li class="goods-card">
      <a href=detail.html?${item.id} class="card-icon more-icon">
        <div class="card-img-box">
          <img src="${item.image}" alt="${item.name}" class="card-img">
        </div>
      </a>
      <div class="card-info">
        <div class="info-stock ">${stockStatus > 0? stockStatus + " in Stock": "Out of Stock"}</div> 
        <div class="card-title">
          <p>${item.name}</p>
        </div>
        <div class="card-precis">
            <span class="card-price">$${item.price.toLocaleString()}</span>
            <button type="button" data-id=${
              item.id
            } class="card-icon cart-icon"><i class='bx bx-cart'></i></button>
        </div>               
      </div>
    </li>
`;
}

function loadCategory(itemsBox) {
  const selectContainer = document.querySelector(".goods-item");
    let wholePage = itemsBox

  if (selectContainer !== null) {
    selectContainer.innerHTML = wholePage
      .map((item) => {
        let ret = "";
        if (!Categories.has(item.category)) {
          Categories.add(item.category);
          ret = createCategory(item);
          console.log(item.category);
        }
        return ret;
      })
      .join("");
  }
}

export function createCategory(item) {
  return `
      <option
        data-key=${item.category}
        data-value=${item.category}
        class="choice-sort select-food"
      >
        ${item.category}
      </option>
`;
}

//pagination paint
function pagination(itemsBox) {
  const pageContainer = document.querySelector(".goods-pagination");

  let pageArray = [];
  let totalCount = itemsBox.length;
  let totalPage = Math.ceil(totalCount / 6);
  let currentPage = 1;

  for (let i = 1; i <= totalPage; i++) {
    pageArray.push(i);
  }

  if (pageContainer !== null) {
    pageContainer.innerHTML = pageArray
      .map((num) => paginationHTML(num))
      .join("");
  }

  function pageData(e) {
    if (e.target.tagName === "BUTTON") {
      let currentPage = parseInt(e.target.innerHTML);

      displayItems(itemsBox, currentPage);

      //loadCart(itemsBox);
      // loadWish(itemsBox);
    }
  }

  pageContainer && pageContainer.addEventListener("click", pageData);

  displayItems(itemsBox, currentPage);
}

//pagination - html
function paginationHTML(num) {
  return `
  <li class="page-list">
    <button type="button" class="page-btn">${num}</button>
  </li>
  `;
}

//user selected 
function selectHandler(itemsBox) {
  const sortContainer = document.querySelector(".goods-sort");

  if (sortContainer !== null) {
    sortContainer.addEventListener("change", (e) =>
      selectFilter(e, itemsBox)
    );
  }
}

// filtering
function selectFilter(e, itemsBox) {
  const choiceSortBox = e.target;
  const userChoice =
    choiceSortBox.options[choiceSortBox.selectedIndex].dataset;

  const userSelect = itemsBox.filter(
    (item) => item.category === userChoice.value

  );
  console.log(userChoice.key)
  console.log(userChoice.value)
  console.log(userSelect)

  pagination(userSelect);
  // loadCart(userSelect);
}

//main
asyncMarkupData()
  .then(() => {
    return loadItems();
  })
  .then((itemsBox) => {

    totalCartCount();
    loadCategory(itemsBox);
    pagination(itemsBox);
    // loadCart(itemsBox);
    loadDetail(itemsBox);
    selectHandler(itemsBox);
    paintCartPage(itemsBox);
  });
