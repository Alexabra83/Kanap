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
function getBasket(){
    fetch(API_URL + id)
    .then(res => res.json())
    .then(data => displayBasket(data));
}


function getBasket() {
    let cart = localStorage.getItem("basket");

    return JSON.parse(cart);
}


/** information kanap panier */
function displayKanap(kanap){

    /**cart item */
    let productImg = document.createElement('cart__img');
    productImg.src = kanap.imageUrl;
    productImg.alt = kanap.altTxt;
    let divItemImg = document.querySelector('.cart__item__img');
    divItemImg.appendChild(productImg);

    /**cart item content */
    let productName = document.getElementById('title');
    productName.innerText = kanap.name;
    
    /**cart content descrption */
    let productDescription = document.getElementById('description');
    productDescription.innerText = kanap.description;

}