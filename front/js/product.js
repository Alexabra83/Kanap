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

    
    function saveBasket(kanap){
        localStorage.setItem("basket", JSON.stringify(kanap));
    }

    function getBasket(){
        let basket = localStorage.getItem("basket");
        if (basket === null){
            return[];
        }else{
            return JSON.parse(basket);
        }
    }

    function getQuantity() {
      let quantity = document.getElementById("quantity").value;
      quantity = (quantity <= 0) ? 1 : quantity;

      return quantity;
    }

    function getColors() {
      let colors = document.getElementById("colors").value;

      if (!colors) {
        alert("veuillez renseigner la couleur");
        return false;

      }else {
        return colors;
      }
    }

    function addToBasket() {
        let quantity = getQuantity();
        let colors = getColors();
        let basket = getBasket();
        let kanap = {
            "id": id,
            "quantity": quantity,
            "colors": colors
        };

        let isInBasket = false;

        /**console.log("coucou");
        console.log(basket);
        console.log(basket.length);**/
        if(basket !== undefined) {
            basket.forEach(element => {
                if(element.id === kanap.id && element.colors === kanap.colors) {
                    element.quantity = Number(element.quantity) + Number(kanap.quantity);
                    console.log(element.quantity);
                    isInBasket = true;
                }
            });
        }
        

        /**for(let i = 0; i < basket.lenght; i++) {
            console.log("coucou2");
            console.log(basket[i].id === kanap.id && basket[i].colors === kanap.colors)
            if(basket[i].id === kanap.id && basket[i].colors === kanap.colors) {
                basket[i].quantity = Number(basket[i].quantity) + Number(kanap.quantity);
                console.log(basket[i].quantity);
                isInBasket = true;
            }
        }**/

        if(!isInBasket) {
            basket.push(kanap);
        }
        
        localStorage.setItem("basket", basket);

        console.log(basket);


        /*let foundKanap = basket.find(itemBasket => itemBasket.id == kanap.id);
        if (foundKanap !== undefined) {
            foundKanap.quantity++;
        
        }else {
            kanap.quantity = 1;
            basket.push(kanap);
        }*/

    
        saveBasket(basket);
    
    }
    
    getKanap();
    document.getElementById("addToCart").addEventListener("click", addToBasket);



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

