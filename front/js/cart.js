"use strict";

// VARIABLES et CONSTANTES
// récupérer l'id dans l'url de la page, ajouter dans l'APIURL
const API_URL = "http://localhost:3000/api/products/";
let params = new URL(document.location).searchParams;
let id = params.get("id");
let basket = localStorage.getItem("basket");
let fullBasket = [];
let quantity = 0;
let price = 0;
// FONCTIONS

/**
 * GET KANAP
 */
function getAllKanaps(){
  fetch(API_URL)
  .then(res => res.json())
  .then(data => setBasket(data));
}

function setBasket(apiData){
  basket = JSON.parse(basket);

//console.log(apiData);
  for (let i=0; i < basket.length; i++){
    quantity += Number(basket[i].quantity);
    for (let j=0; j < apiData.length; j++){

      if (apiData[j]._id === basket[i]._id){

        basket[i].imageUrl = apiData[j].imageUrl;
        basket[i].name = apiData[j].name;
        basket[i].price = apiData[j].price;

    price += Number(basket[i].price) * Number(basket[i].quantity);

//ajouter les elements manquant , noms, alt, alttxt


        fullBasket.push(basket[i]);
      }
    }
  }
  totalQuantity();
  totalPrice();
  displayItems(fullBasket);
}



function displayItems(basket){
  console.log(basket);
  basket.forEach((item) => displayItem(item));
}

function displayItem(item){
  let cartItems = document.querySelector("#cart__items");

  let productArticle = document.createElement("article");
    cartItems.appendChild(productArticle);
    productArticle.dataset.id = item._id;
    productArticle.dataset.colors = item.colors;

    let productImg = document.createElement('img');
    productImg.src = item.imageUrl;
    productImg.alt = item.altTxt;
    productImg.style.width = '25%';
    productImg.style.borderRadius = '25px';
    productArticle.appendChild(productImg);

    let productName = document.createElement('h2');
    productName.innerText = item.name;
    productArticle.appendChild(productName);

    let productColors = document.createElement('p');
    productColors.innerText = item.colors;
    productArticle.appendChild(productColors);

    let productPrice = document.createElement('p')
    productPrice.innerText = item.price + " €";
    productArticle.appendChild(productPrice);

    
    let inputQuantity = document.createElement("input");
    inputQuantity.type= "number";
    inputQuantity.classList.add("itemQuantity");
    inputQuantity.name = "itemQuantity";
    inputQuantity.min = "1";
    inputQuantity.max = "100";
    inputQuantity.value = item.quantity;
    //let itemQuantity = document.createElement('p');
    //itemQuantity.innerText = inputQuantity.quantity;
    let labelQuantity = document.createElement("label");
    labelQuantity.innerText = "Qte: ";

    inputQuantity.addEventListener("input", e => {
      //console.log(e.target.value);
      modifQuantity(item.id, item.colors, e.target.value);
    })

    labelQuantity.appendChild(inputQuantity);
    productArticle.appendChild(labelQuantity);

    let deleteBtn = document.createElement("button");
    deleteBtn.addEventListener("click", function(){
      deleteItemSelect(item);
    })
    deleteBtn.innerText = "Supprimer";
    deleteBtn.style.height = '30px';
    deleteBtn.style.width = '110px';
    deleteBtn.classList.add("deleteItem");
    productArticle.appendChild(deleteBtn);
}

function modifQuantity(item_id, item_colors, newQuantity){
  //console.log(item_id);
  //console.log(quantity);
      for (let q = 0; q < fullBasket.length; q++){
        if (fullBasket[q].id === item_id && fullBasket[q].colors === item_colors){
          if (fullBasket[q].quantity < newQuantity){
            quantity ++;
            price += Number(fullBasket[q].price);
          }
          else{
            quantity --;
            price -= Number(fullBasket[q].price);
          }
          totalQuantity();
          totalPrice();
          basket[q].quantity = newQuantity;
        };
      };
      //console.log(basket);
      localStorage.setItem('basket', JSON.stringify(basket));
}


function addDeleteAction(){
  let deleteItems = document.getElementsByClassName("deleteItem");
  
  for (let i = 0; i < deleteItems.length; i++){
    console.log(deleteItems);
    const index = i;
    deleteItems [i].addEventListener("click", function(e){
      deleteItemSelect(e, fullBasket[index]);
    })
  }
}

function deleteItemSelect(item) {
  basket = basket.filter(i => i._id !== item._id || i.colors !== item.colors);
  fullBasket = fullBasket.filter(i => i._id !== item._id || i.colors !== item.colors);
  localStorage.setItem('basket', JSON.stringify(basket));
  const article = document.querySelector("[data-id='" + item._id + "']" + "[data-colors='" + item.colors + "']");
  article.remove();
  if (basket.length === 0) {
    localStorage.removeItem('basket');
  }
  price -= Number(item.price) * Number(item.quantity);
  quantity -= Number(item.quantity);
  totalPrice();
  totalQuantity();
}

function totalQuantity(){
  let articleQuantity = document.getElementById("totalQuantity");
      articleQuantity.innerText = quantity;
}

function totalPrice(){

  let basketTotalPrice = document.getElementById("totalPrice");
      basketTotalPrice.innerText = price;
}

const orderForm = document.querySelector(".cart__order__form");
orderForm.addEventListener("submit", function(e){
  e.preventDefault()
  const firstNameInput = document.querySelector('#firstName');
  let isValidFirstName = /^[a-zA-Z \-']+$/.test(firstNameInput.value);
  const lastNameInput = document.querySelector('#lastName');
  let isValidLastName = /^[a-zA-Z \-']+$/.test(lastNameInput.value);
  const addressInput = document.querySelector('#address');
  let isValidAddress = /^[a-zA-Z0-9\s,'-]*$/.test(addressInput.value);
// faire les autres

  const firstNameErrorMsg = document.querySelector('#firstNameErrorMsg');
  firstNameErrorMsg.innerText = '';
  if(isValidFirstName === false){
    firstNameErrorMsg.innerText= "Prénom mal formaté";
  }
});

/**function deleteItem(id){

  let deleteItems = document.createElement("div");
    let p = document.createElement("p");
    deleteItems.classList.add("deleteItem");
    p.textContent = "Supprimer";
    deleteItems.appendChild('p');



  let basket = localStorage.getItem("basket");
  basket = JSON.parse(basket);
  console.log(typeof basket);

  for (let i=0; i < basket.length; i++){
      if (basket[i].id === id){
        basket.splice(i, 1);
      }
  }
  console.log(basket);
}*/




/**function makeSettings(item){
  //console.log(makeSettings);
  let settings = document.createElement("div");
  settings.classList.add("cart__item__content__settings");

  deleteSettings(settings);
}

function deleteSettings(settings){
  let deleteButton = document.createElement("div");
  deleteButton.classList.add(cart__item__content__settings__delete);
  div.appendChild("div");
  let deleteItem = document.createElement("p");
  deleteItem.innertext = "Supprimer";
  settings.appendChild("p");

}*/





/**function getBasket() {
    let cart = localStorage.getItem("basket");

    return JSON.parse(cart);
}
 function getCart(cartKanap)
    let cart = getBasket();

    for (let i = 0; i < colors.length; i++){
        
    }

/** information kanap panier */
/**function displaycart(kanap){

    /**cart item 
    let productImg = document.createElement('article');
    let divItemImg = document.querySelector('.cart__item__img');
    divItemImg.appendChild(productImg);

    /**cart item content 
    let productName = document.getElementById('title');
    productName.innerText = kanap.name;
    
    /**cart content descrption 
    let productDescription = document.getElementById('description');
    productDescription.innerText = kanap.description;

    /**bouton supprimer */
/** }

/** quantité final + prix */

getAllKanaps();
//totalQuantity();
//totalPrice();