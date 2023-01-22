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
  //console.log(apiData);

  let basket = localStorage.getItem("basket");
  basket = JSON.parse(basket);
  //console.log(basket);
}

function getFullCart(apiData){

  let fullcart = getBasket();

  for (let i=0; i < apiData.length; i++){
    for (let j=0; j < fullcart.length; j++);
  }
// double boucle pour comparé api et panier qui renvoi full cart
}


function displayItems(fullcart){
  let cartItems = document.querySelector("#cart__items");
  console.log(cartItems);

  basket.forEach((item) => displayItem(item));
  //displayItems(fullcart);
}

function displayItem(item){
  console.log(displayItem);

  const article = document.createElement("article");
  const div = document.createElement("div");
  const image = document.createElement('img');
  const content = document.createElement("info");
  const description = document.createElement("description");

  /**article.classList.add("cart__item");*/
  article.dataset.id = item.id;
  article.dataset.color = item.color;
  article.dataset.name = item.name;
  article.dataset.quantity = item.quantity;
  article.dataset.price = item.price;
  div.classList.add("cart__item__img");
  image.src = item.imageUrl;
  image.alt = item.altTxt;

  description.className = "cart__item_content__description";
  console.log(description);

  cartItems.appendChild(article);
  div.appendChild(image);
  div.appendChild(content);
  div.appendChild(description);
}
displayItem();
getAllKanaps();




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