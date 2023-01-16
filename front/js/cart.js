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
/**function getBasket(){
    fetch(API_URL + id)
    .then(res => res.json())
    .then(data => displayBasket(data));
}*/

const cart = [];

function itemFromLocalStorage(){
    const numberOfItems = localStorage.lenght;
    for (leti = O; i < numberOfItems; i++){
        let item = localStorage.getItem(localStorage.key(i));
        let itemObject = JSON.parse(item);
        cart.push(itemObject);
    }
}

cart.forEach((item) => displayItem(item));

function displayItem(item){
    let image = makeImage(item);
    displayImage(image);
    let article = makeArticle(item);
    displayArcticle(article);
    let div = makeImageDiv(item);
    article.appendChild(div);
}

function displayArcticle(article) {
    document.querySelector("#cart__items").appendChild(article)
}

function makeArticle(item){
    let article = document.createElement("article");
    article.classList.add("cart__item");
    article.dataset.id = item.id;
    article.dataset.color = item.color;
    return article
}
    
function makeImageDiv(item){
    let div = document.createElement("div");
    div.classList.add("cart__item__img");

    let image = document.createElement('img');
    image.src = item.imageUrl;
    image.alt = item.altTxt;
    div.appendChild(image);
    return div
}






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