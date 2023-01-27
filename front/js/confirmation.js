//getting whats in localstorage 
const params = new URL(document.location).searchParams;
const orderId = params.get("orderId");//get de element and the id or number from the purchase
document.getElementById("orderId").textContent = orderId;
alert("Commande effectuée avec succès");