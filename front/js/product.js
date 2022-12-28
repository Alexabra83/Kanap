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
function getKanap(){
    fetch(API_URL + id)
    .then(res => res.json())
    .then(data => displayKanap(data));
}

/**
 * DISPLAY KANAP
 * @param {object} data 
 */
function displayKanap(kanap){

        let productImg = document.createElement('img');
        productImg.src = kanap.imageUrl;
        productImg.alt = kanap.altTxt;
        let divItemImg = document.querySelector('.item__img');
        divItemImg.appendChild(productImg);
    
        let productName = document.getElementById('title');
        productName.innerText = kanap.name;

        let productPrice = document.getElementById('price');
        productPrice.innerText = kanap.price;

        let productDescription = document.getElementById('description');
        productDescription.innerText = kanap.description;

        getAllColors(kanap.colors)
}

function getAllColors(colors) {
    let selectColor = document.getElementById("colors");
    for (let i = 0; i < colors.length; i++) {
        let optionColor = document.createElement("option");
        optionColor.value = colors[i];
        optionColor.innerText = colors[i];
        selectColor.appendChild(optionColor);
    }
}

// addEventListener
/**
    addToBasket.addEventListener("click", (event) => {
    event.addToBasket();
    */
    
    function saveBasket(kanap){
        localStorage.setItem("basket", JSON.stringify(basket));
    }

    function getBasket(){
        let basket = localStorage.getItem("basket");
        if (basket == null){
            return[];
        }else{
            return JSON.parse(basket);
        }
    }

    function addToBasket(kanap) {
        let basket = getBasket();
        let foundKanap = basket.
        basket.push(kanap);
        saveBasket(basket);
    }











        /**let basket = localStorage.getItem("product")
        //basket = JSON.parse(basket)
    
        //if(basket){
    
        }
        //else{
            basket = [];
            basket.push()
        }
    }*/

//fin addEventListener
/** })*/




// Crée une fonction add too basket qui sera appelé par add event listener
// coupler la quantité des éléments identiques et pas dans cart.js (bonne pratique)
// relier le projet codacy et code climate


// CODE PRINCIPAL

getKanap();