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