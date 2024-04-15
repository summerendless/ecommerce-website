const cartContainer = document.querySelector(".cart-container");
const cartTotalPrice = document.querySelector(".total-price");
const cartBox = document.querySelector(".cart-container-box");
const cartEmpty = document.querySelector(".empty");

const cartCheckOutButton = document.querySelector("#cart-checkout-btn");

const closeCartCheckOutButton = document.querySelector("#close-cart-checkout-btn");

const cartContent = document.querySelector("#cart-content");

const clearCartButton = document.querySelector("#clear-cart-btn");

const closeCartButton = document.querySelector("#close-cart-btn");

if(cartContent !== null){
  cartContent.style.display = "flex"
  closeCartButton.onclick = closeCart;
}

//cart-storage
export let saveCartGoods = localStorage.getItem("cartList")
  ? JSON.parse(localStorage.getItem("cartList"))
  : [];

//createHTML - cart
function cartCreateHTML(item) {
  let stockStatus;

  if (item.stock) {
    stockStatus = "In Stock";
  } else {
    stockStatus = "Out of Stock";
  }

  return `
    <li class="cart-goods">
      <div class="goods-thumb">
        <img src="${item.image}" alt="${item.productName}" />
      </div>
      <div class="cart-info-box">
        <div class="item-info">
          <div class="info-stock">${stockStatus}</div> 
          <dl>
            <dt class="info-name">${item.productName}</dt>
            <dd class="info-price">$${item.price.toLocaleString()}</dd>
          </dl>
          <button class="item-remove" type="button" data-id=${
            item.id
          }>Remove</button>
        </div>
        <div class="item-control">
          <div class="item-count">
            <button class="count-minus" type="button" data-id=${
              item.id
            } data-value="minus">
              <i class="bx bx-minus"></i>
            </button>
            <span class="count">${item.order}</span>
            <button class="count-plus" type="button"  data-id=${
              item.id
            } data-value="plus">
              <i class="bx bx-plus"></i>
            </button>
          </div>
          <strong class="single-total-price">
            $${(item.price * item.order).toLocaleString()}
          </strong>
        </div>
      </div>
    </li>`;
}

//total price
function totalPrice() {
  const priceBox = saveCartGoods.reduce((prev, curr) => {
    return prev + curr.price * curr.order;
  }, 0);
  if (cartTotalPrice) {
    cartTotalPrice.innerHTML = '$' + priceBox.toLocaleString();
  }
}

// cart-page paint
export function paintCartPage() {
  const loadCartGoods = localStorage.getItem("cartList");
  if (cartContainer !== null) {
    cartContainer.innerHTML = JSON.parse(loadCartGoods)
      .map((item) => cartCreateHTML(item))
      .join("");
    if (cartContainer.children.length !== 0) {
      cartEmpty.classList.add("hidden");
      cartBox.classList.remove("hidden");
    } else {
      cartBox.classList.add("disabled");
      document.getElementById("cart-checkout-btn").disabled = true;

    }
  }
  totalPrice();
}

//save cart
export function saveCart(saveCartGoods) {
  localStorage.setItem("cartList", JSON.stringify(saveCartGoods));
}

//cart goods
export function loadCart(itemsBox) {
  const cartbtns = document.querySelectorAll(".cart-icon");
  cartbtns.forEach((cartbtn) => {
      cartbtn.addEventListener("click", (e) => {
      const goodsCart = e.target.parentNode;
      goodsCart &&
        itemsBox.find((item) => {
          if (item.id === parseInt(goodsCart.dataset.id)) {
            if (saveCartGoods.some((cart) => cart.id === item.id)) {
              console.log("already exist");
              alert("already exist");
            } else {
              //add in cart
              item.cart = true;
              item.order += 1;
              console.log("added in cart");
              alert("added in cart");
              return saveCartGoods.push(item);
            }
          }
        });
      saveCart(saveCartGoods);
      totalCartCount();
    });
  });
}

export function closeCartCheckoutPopup() {
  document.getElementById("cart-checkout").style.display = "none";
}

export function validateForm() {
  var isValid = true;
  var inputs = document.querySelectorAll('input[required], select[required]');
    for (var i = 0; i < inputs.length; i++) {
      if (!inputs[i].checkValidity()) {
          alert("빈 값이 있네요.");
        isValid = false;
        break;
      }
    }

    var submitButton = document.querySelector('.btn-order input[type="submit"]');
    if (isValid) {
      submitButton.style.backgroundColor = ""; // 원래 색상으로 변경
      submitButton.disabled = false;
    } else {
      submitButton.style.backgroundColor = "red";
      submitButton.disabled = true;
    }

    return isValid;
}


export function openCartCheckoutPopup() {
  document.getElementById("cart-checkout").style.display = "flex";
    validateForm();

}

export function clearCart(){
  saveCartGoods.splice(0, saveCartGoods.length);
  while(cartContainer.firstChild){
    cartContainer.firstChild.remove()
  }
  saveCart(saveCartGoods);
  totalPrice();
  totalCartCount();
  cartEmpty.classList.remove("hidden");
  cartBox.classList.add("disabled");
  document.getElementById("cart-checkout-btn").disabled = true;

}

export function closeCart(){
  cartContent.style.display = "none";
  history.back();
}

//delete cart
function deleteCart(e) {
  const cartRemoveBtns = document.querySelectorAll(".item-remove");
  cartRemoveBtns.forEach((cartRemoveBtn) => {
    if (e.target === cartRemoveBtn) {
      const cleanCart = saveCartGoods.findIndex((item) => {
        return item.id === parseInt(cartRemoveBtn.dataset.id);
      });
      //cart-storage에서 삭제
      saveCartGoods.splice(cleanCart, 1);
      //cart-page에서 삭제
      cartContainer.removeChild(cartContainer.children[cleanCart]);
      //변경사항 저장
      saveCart(saveCartGoods);
      totalPrice();
      totalCartCount();
    }
  });
  if (cartContainer.children.length === 0) {
    cartEmpty.classList.remove("hidden");
    cartBox.classList.add("disabled");
    document.getElementById("cart-checkout-btn").disabled = true;
  }
}

//single goods price and count
function singleGoodsControl(e, plusMinusBtns) {
  const goodsCount = document.querySelectorAll(".count");
  const singleGoodsPrice = document.querySelectorAll(".single-total-price");

  plusMinusBtns.forEach((plusMinusBtn) => {
    if (e.target.parentNode === plusMinusBtn) {
      const cartdataId = saveCartGoods.findIndex((item) => {
        return item.id === parseInt(plusMinusBtn.dataset.id);
      });
      const pickGoods = saveCartGoods[cartdataId];
      //cart-storage minus
      if (plusMinusBtn.dataset.value === "plus") {
        pickGoods.order++;
      } else {
        pickGoods.order > 1 && pickGoods.order--;
      }
      //cart-page plus
      goodsCount[cartdataId].innerHTML = pickGoods.order;
      //total price of list
      singleGoodsPrice[cartdataId].innerHTML = (
        pickGoods.price * pickGoods.order
      ).toLocaleString();
      //save
      saveCart(saveCartGoods);
    }
  });
}



//cart total number of goods
export function totalCartCount() {
  const totalCounts = document.querySelectorAll(".top-cart-count");
  totalCounts.forEach((totalCount) => {
    totalCount.innerHTML = saveCartGoods.length;
    if (saveCartGoods.length === 0) {
      totalCount.innerHTML = "";
    }
  });
}

window.addEventListener("load", totalCartCount);

//cart-page controller
function cartListHandler(e) {
  const plusBtns = document.querySelectorAll(".count-plus");
  const minusBtns = document.querySelectorAll(".count-minus");

  //single goods price and count
  singleGoodsControl(e, plusBtns);
  singleGoodsControl(e, minusBtns);

  deleteCart(e);
  totalPrice();
}

if (cartContainer !== null) {
  cartContainer.addEventListener("click", cartListHandler);
}


if(cartCheckOutButton !== null){
  cartCheckOutButton.onclick = openCartCheckoutPopup;
}

if(closeCartCheckOutButton !== null){
  closeCartCheckOutButton.onclick = closeCartCheckoutPopup;
}

if(clearCartButton !== null){
  console.log(clearCartButton);
  clearCartButton.onclick = clearCart;
}