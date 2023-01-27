// Get the products stocked on LocalStorage 
let productInLocalStorage = JSON.parse(localStorage.getItem("cartItems"));

// Display the products of cart 
async function displayCart() {
  const parser = new DOMParser();
  const positionEmptyCart = document.getElementById("cart__items");
  let cartArray = [];

// if the cart is empty: display 'le panier est vide'
  if (productInLocalStorage === null || productInLocalStorage == 0) {
    document.querySelector("#cart__items").innerHTML = `
    <div class="cart__empty">
      <p>Votre panier est vide ! <br> Merci de sélectionner des produits depuis la page d'accueil</p>
    </div>`;
  } else {
    // if the card is not empty : display the products on the localStorage 
     // initial expression; condition; incrémentation.
    for (i = 0; i < productInLocalStorage.length; i++) {
      const product = await getProductById(productInLocalStorage[i].id);
      const totalPriceItem = (product.price *= productInLocalStorage[i].quantity);
 
      // it will be injected on each tour of the loop
      cartArray += `
       <article class="cart__item" data-id=${productInLocalStorage[i].id}>
       <div class="cart__item__img">
         <img src="${product.imageUrl}" alt="Photographie d'un canapé">
       </div>
       <div class="cart__item__content">
         <div class="cart__item__content__titlePrice">
           <h2>${product.name}</h2>
           <p>${productInLocalStorage[i].color}</p>
           <p>
           
           ${totalPriceItem} €</p>
         </div>
         <div class="cart__item__content__settings">
           <div class="cart__item__content__settings__quantity">
             <p>Qté : </p>
             <input data-id= ${productInLocalStorage[i].id} data-color= ${productInLocalStorage[i].color} type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${productInLocalStorage[i].quantity}>
           </div>
           <div class="cart__item__content__settings__delete">
             <p data-id= ${productInLocalStorage[i].id} data-color= ${productInLocalStorage[i].color} class="deleteItem">Supprimer</p>
           </div>
         </div>
       </div>
     </article>
     `;
    }

    // Number of articles and total price of the card 
    let totalQuantity = 0;
    let totalPrice = 0;
    for (i = 0; i < productInLocalStorage.length; i++) {
      const article = await getProductById(productInLocalStorage[i].id);
      totalQuantity += parseInt(productInLocalStorage[i].quantity);
      totalPrice += parseInt(article.price * productInLocalStorage[i].quantity);
    }
    document.getElementById("totalQuantity").innerHTML = totalQuantity;
    document.getElementById("totalPrice").innerHTML = totalPrice;
    if (i == productInLocalStorage.length) {
      const displayBasket = parser.parseFromString(cartArray, "text/html");
      positionEmptyCart.appendChild(displayBasket.body);
      modifyQuantity();
      deleteItem();
    }
  } // end else that contain kanap
} // end function displayCart
// We getting the product from API it will help for the price 
async function getProductById(productId) {
  return fetch("http://localhost:3000/api/products/" + productId)
    .then(function (res) {
      return res.json();
    })
    .catch((err) => {
      // there is a mistake 
      console.log("erreur");
    })
    .then(function (response) {
      return response;
    });
} // end function getProductById
displayCart();

// Modification quantity of the cart
function modifyQuantity() {
  const quantityInputs = document.querySelectorAll(".itemQuantity");
  quantityInputs.forEach((quantityInput) => {
    quantityInput.addEventListener("change", (event) => {
      event.preventDefault();
      const inputValue = event.target.value;
      const dataId = event.target.getAttribute("data-id");
      const dataColor = event.target.getAttribute("data-color");
      let cartItems = localStorage.getItem("cartItems");
      let items = JSON.parse(cartItems);
      const resultat = items.find((product) => {
        if (product.id === dataId && product.color === dataColor) return true;
        return false;
      });
      if (resultat != undefined) {
        items = items.map((item, index) => {
          if (item.id === dataId && item.color === dataColor) {
            item.quantity = inputValue;
          }
          return item;
        });
      }
      let itemsStr = JSON.stringify(items);
      localStorage.setItem("cartItems", itemsStr);
      location.reload();
    });
  }); // end quantityInputs.forEach
} // end function modifyQuantity

// Delete a product on cart 
function deleteItem() {
  const deleteButtons = document.querySelectorAll(".deleteItem");
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", (event) => {
      event.preventDefault();
        //create const that we'll need
      const deleteId = event.target.getAttribute("data-id");
      const deleteColor = event.target.getAttribute("data-color");
        // filter element clicked by the button delete 
        // and respecting the callback conditions
      productInLocalStorage = productInLocalStorage.filter(

        (element) => !(element.id == deleteId && element.color == deleteColor)
      );
      deleteConfirm = window.confirm("Voulez-vous supprimé cet article ?");
      //if article delete then reload for the localstorage
      if (deleteConfirm == true) {
        localStorage.setItem("cartItems", JSON.stringify(productInLocalStorage));
        location.reload();
        alert("Article supprimé");
      }
    });
  }); // end deleteButtons.forEach
} // end function deleteItem

//Sending form 
//  Regex
let validName = /^[a-zA-Z\-çñàéèêëïîôüù ]{2,}$/;
let validAddress = /^[0-9a-zA-Z\s,.'-çñàéèêëïîôüù]{3,}$/;
let validEmail = /^[A-Za-z0-9\-\.]+@([A-Za-z0-9\-]+\.)+[A-Za-z0-9-]{2,4}$/;

// Getting the id of the form 
//getting the data from the form in an object 
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");

  // --- Checking validation of entries --- //

//check prénom, test : Martin-Luther Jr. or ñÑâê or ации or Pierre Bottero
firstName.addEventListener("input", (event) => {
  event.preventDefault();
  if (validName.test(firstName.value) == false || firstName.value == "") {
    document.getElementById("firstNameErrorMsg").innerHTML =
      "Prénom non valide";
  } else {
    document.getElementById("firstNameErrorMsg").innerHTML = "";
  }
}); // end firstname


// controling name
lastName.addEventListener("input", (event) => {
  event.preventDefault();
  if (validName.test(lastName.value) == false || lastName.value == "") {
    document.getElementById("lastNameErrorMsg").innerHTML = "Nom non valide";
    return false;
  } else {
    document.getElementById("lastNameErrorMsg").innerHTML = "";
    return true;
  }
}); //end lastname

 // controling adresse
address.addEventListener("input", (event) => {
  event.preventDefault();
  if (validAddress.test(address.value) == false || address.value == "") {
    document.getElementById("addressErrorMsg").innerHTML = "Adresse non valide";
    return false;
  } else {
    document.getElementById("addressErrorMsg").innerHTML = "";
    return true;
  }
}); //end adress

// controling city
city.addEventListener("input", (event) => {
  event.preventDefault();
  if (validName.test(city.value) == false || city.value == "") {
    document.getElementById("cityErrorMsg").innerHTML = "Ville non valide";
    return false;
  } else {
    document.getElementById("cityErrorMsg").innerHTML = "";
    return true;
  }
}); //end city

//controlling email
email.addEventListener("input", (event) => {
  event.preventDefault();
  if (validEmail.test(email.value) == false || email.value == "") {
    document.getElementById("emailErrorMsg").innerHTML = "Email non valide";
    return false;
  } else {
    document.getElementById("emailErrorMsg").innerHTML = "";
    return true;
  }
}); //end email

 // --- End of checking validation of entries  --- //

//we order and then we need to check if everything is added(name, city no empty is allowed)
let order = document.getElementById("order");
order.addEventListener("click", (e) => {
  e.preventDefault();
  // table of data from user
  let contact = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    city: city.value,
    email: email.value,
  };

  if (
    firstName.value === "" ||
    lastName.value === "" ||
    address.value === "" ||
    city.value === "" ||
    email.value === ""
  ) {
    window.confirm("Coordonnées imcomplètes");
  } else if (
    validName.test(firstName.value) == false ||
    validName.test(lastName.value) == false ||
    validAddress.test(address.value) == false ||
    validName.test(city.value) == false ||
    validEmail.test(email.value) == false
  ) {
    window.confirm("Coordonnées non conforme");
  } else {
       // After checking, sending the object to the localStorage
    let products = [];
    productInLocalStorage.forEach((order) => {
      products.push(order.id);
    });
      // Putting the values from the form and the product selected in an object 
    const sendFormData = { contact, products };

    // Calling the API order to send the tables
    // sending the form + localStorage (sendFormData) to server
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(sendFormData),
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((confirm) => {
        window.location.href = "./confirmation.html?orderId=" + confirm.orderId;
        localStorage.clear();
      })
      .catch((error) => {
        console.log("une erreur est survenue");
      });
  }
}); // end let order