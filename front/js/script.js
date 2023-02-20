"use strict";

// VARIABLES et CONSTANTES
const API_URL = "http://localhost:3000/api/products";

// FONCTIONS

/**
 * GET ALL KANAPS
 */
function getAllKanaps(){
    fetch(API_URL)
    .then(res => res.json())
    .then(data => displayAllKanaps(data));
}

/**
 * DISPLAY ALL KANAPS
 * @param {object} data 
 */
function displayAllKanaps(data){
    for (let i=0; i < data.length; i++) {
        let allKanaps = data[i];

        let productLink = document.createElement("a");
        productLink.href = "./product.html?id=" + allKanaps._id
        document.getElementById("items").append(productLink);

        let productArticle = document.createElement("article");
        productLink.appendChild(productArticle);

        let productImg = document.createElement('img');
        productImg.src = allKanaps.imageUrl;
        productImg.alt = allKanaps.altTxt;
        productArticle.appendChild(productImg);
    
        let productName = document.createElement('h3');
        productName.innerText = allKanaps.name;
        productArticle.appendChild(productName);

        let productDescription = document.createElement('p');
        productDescription.innerText = allKanaps.description;
        productArticle.appendChild(productDescription);
    }
}
// CODE PRINCIPAL

getAllKanaps();