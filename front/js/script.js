"use strict";

// VARIABLES et CONSTANTES
const API_URL = "http://localhost:3000/api/products";

// FONCTIONS
function getAllKanaps(){
    fetch(API_URL)
    .then(res => res.json())
    .then(data => displayAllKanaps(data));
}

function displayAllKanaps(data){
    for (let i=0; 1 < data.lenght; i++) {
        const allKanaps = data[i];

        let linkProduct = document.createElement("a");
        linkProduct.href = "./product.html?id=" + allKanaps._id
        document.getElementById("items").append(linkProduct);

        let productImg = document.createElement('img');
        productImg.src = allKanaps.img;
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