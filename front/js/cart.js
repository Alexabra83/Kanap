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
  if (basket) {
    basket = JSON.parse(basket)
  } else {
    basket = []
  }

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
    let labelQuantity = document.createElement("label");
    labelQuantity.innerText = "Qte: ";

    inputQuantity.addEventListener("input", e => {
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
      localStorage.setItem('basket', JSON.stringify(basket));
}


function addDeleteAction(){
  let deleteItems = document.getElementsByClassName("deleteItem");
  
  for (let i = 0; i < deleteItems.length; i++){
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

function checkIfFieldsErrors(firstName, lastName, address, city, email){
  let isValidFirstName = /^[a-zA-Z \-']+$/.test(firstName.value);
  let isValidLastName = /^[a-zA-Z \-']+$/.test(lastName.value);
  let isValidAddress = /^[a-zA-Z0-9\s,'-]*$/.test(address.value);
  let isValidCity = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/.test(city.value);
  let isValidEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email.value);

  let errors = 0;

  const firstNameErrorMsg = document.querySelector('#firstNameErrorMsg');
  firstNameErrorMsg.innerText = '';
  if(isValidFirstName === false){
    firstNameErrorMsg.innerText= "Prénom mal formaté";
    errors ++
  }
  const lastNameErrorMsg = document.querySelector('#lastNameErrorMsg');
  lastNameErrorMsg.innerText = '';
  if(isValidLastName === false){
    lastNameErrorMsg.innerText= "Nom mal formaté";
    errors ++
  }
  const addressErrorMsg = document.querySelector('#addressErrorMsg');
  addressErrorMsg.innerText = '';
  if(isValidAddress === false){
  addressErrorMsg.innerText= "Adresse mal formaté";
    errors ++
  }
  const cityErrorMsg = document.querySelector('#cityErrorMsg');
  cityErrorMsg.innerText = '';
  if(isValidCity === false){
    cityErrorMsg.innerText= "Ville mal Formaté";
      errors++
  }
  const emailErrorMsg = document.querySelector('#emailErrorMsg');
  emailErrorMsg.innerText = '';
  if(isValidEmail === false){
    emailErrorMsg.innerText= "Entrée un E-mail valide";
      errors ++
  }

  if (errors > 0) {
    return true
  }else{
    return false
  }
}

const orderForm = document.querySelector(".cart__order__form");
orderForm.addEventListener("submit", function(e){
  e.preventDefault()
  const firstNameInput = document.querySelector('#firstName');
  const lastNameInput = document.querySelector('#lastName');
  const addressInput = document.querySelector('#address');
  const cityInput = document.querySelector('#city');
  const emailInput = document.querySelector('#email');

if(checkIfFieldsErrors(firstNameInput, lastNameInput, addressInput, cityInput, emailInput)){
  return;
}

  const productIds = [];

  for( let i = 0; i < basket.length; i++){
    productIds.push(basket[i]._id)
  }

  const order = {
    contact: {
      firstName: firstNameInput.value,
      lastName: lastNameInput.value,
      address: addressInput.value,
      city: cityInput.value,
      email: emailInput.value
    },
    products: productIds
  };

  fetch(API_URL+ "order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(order)
  })
  .then(res => res.json())
  .then(data => {
    document.location.href = "./confirmation.html?orderId=" + data.orderId
  });
});

getAllKanaps();