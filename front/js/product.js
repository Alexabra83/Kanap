"use strict";

// VARIABLES et CONSTANTES
// récupérer l'id dans l'url de la page, ajouter dans l'APIURL
const API_URL = "http://localhost:3000/api/products/";


// FONCTIONS

/**
 * GET KANAP
 */
function getKanap(){
    fetch(API_URL + id)
    .then(res => res.json())
    .then(data => displayKanap(kanap));
}

/**
 * DISPLAY KANAP
 * @param {object} data 
 */
function displayKanap(kanap){

        let productLink = document.createElement("a");
        productLink.href = "./product.html?id=" + kanap._id
        document.getElementById("items").append(productLink);

        let productArticle = document.createElement("article");
        productLink.appendChild(productArticle);

        let productImg = document.createElement('img');
        productImg.src = kanap.imageUrl;
        productImg.alt = kanap.altTxt;
        productArticle.appendChild(productImg);
    
        let productName = document.createElement('h3');
        productName.innerText = kanap.name;
        productArticle.appendChild(productName);

        let productDescription = document.createElement('p');
        productDescription.innerText = kanap.description;
        productArticle.appendChild(productDescription);
}

// Crée une fonction add too basket qui sera appelé par add event listener
// coupler la quantité des éléments identiques et pas dans cart.js (bonne pratique)
// relier le projet codacy et code climate


// CODE PRINCIPAL

getKanap();