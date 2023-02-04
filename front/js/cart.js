"use strict";

// VARIABLES et CONSTANTES
// récupérer l'id dans l'url de la page, ajouter dans l'APIURL
const API_URL = "http://localhost:3000/api/products/";
let params = new URL(document.location).searchParams;
let id = params.get("id");

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

  let basket = localStorage.getItem("basket");
  basket = JSON.parse(basket);
  let fullBasket = [];

//console.log(apiData);

  for (let i=0; i < apiData.length; i++){
    for (let j=0; j < basket.length; j++){

      if (apiData[i]._id === basket[j].id){

        basket[j].imageUrl = apiData[i].imageUrl;
        basket[j].name = apiData[i].name;
        basket[j].price = apiData[i].price;

//ajouter les elements manquant , noms, alt, alttxt

        //console.log(basket[j]);
        fullBasket.push(basket[j]);
      }
    }
  }
  displayItems(fullBasket);
}



function displayItems(basket){
  //console.log(cartItems);
  basket.forEach((item) => displayItem(item));
}

function displayItem(item){
  //console.log(item);
  let cartItems = document.querySelector("#cart__items");

  let productArticle = document.createElement("article");
    cartItems.appendChild(productArticle);

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
    labelQuantity.appendChild(inputQuantity);
    productArticle.appendChild(labelQuantity);

    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Supprimer";
    deleteBtn.style.height = '30px';
    deleteBtn.style.width = '110px';
    deleteBtn.classList.add("deleteItem");
    productArticle.appendChild(deleteBtn);
}


function deleteItem(){
  let deleteItems = document.querySelectorAll(".deleteItem");
  deleteItems.forEach((btn, index) => {
    btn.addEventListener('click', e => {
      deleteItemSelect(e, basket[index]);
    });
  });
}

function deleteItemSelect(e, item) {
  basket = basket.filter(i => i._id !== item._id);
  localStorage.setItem('basket', JSON.stringify(basket));

  if (basket.length === 0) {
    localStorage.removeItem('basket');
  }
}

function totalPrice(){
  let totalPriceCalcul = 0;
  let basket = localStorage.getItem("basket");
  basket = JSON.parse(basket);
  console.log(basket.length);
  for (let p = 0; p < basket.length; p++){
    totalPriceCalcul = Number(totalPriceCalcul) + Number(basket[p].price);
    console.log(basket[p]);
  }
  console.log(totalPriceCalcul);

}

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
totalPrice();