import { totalCartCount, saveCart, saveCartGoods } from "./cartPage.js";

const detailImage = document.querySelector(".detail-photo");
const detailTitle = document.querySelector(".detail-name");
const detialPrice = document.querySelector(".detail-price");
const detialCartBtn = document.querySelector(".detail-cart");
const detialBtnBox = document.querySelector(".detail-info-control");

//load detail goods
export function loadDetail(shoesBox) {
  let url = location.search;
  let params = url.substring(url.indexOf("?") + 1, url.length);

  const detailGoods = shoesBox.find((shoes) => {
    return shoes.id === parseInt(params);
  });

  paintDetail(detailGoods);
  detailSelectGoods(detailGoods);
}

function paintDetail(detailGoods) {
  if (detailGoods) {
    detailImage.src = detailGoods.image;
    detailTitle.innerHTML = detailGoods.productName;
    detialPrice.innerHTML = '$' + detailGoods.price.toLocaleString();
  }
}

function detailSelectGoods(detailGoods) {
  detialBtnBox &&
    detialBtnBox.addEventListener("click", (e) => {
      const targetBtn = e.target;
      if (targetBtn === detialCartBtn) {
        if (detailGoods.cart) {
          alert("already exist in cart");
        } else {
          detailGoods.cart = true;
          detailGoods.order += 1;
          alert("added in cart");
          saveCartGoods.push(detailGoods);
          saveCart(saveCartGoods);
          totalCartCount();
        }
      }
    });
}
