// we're getting the id 
const str = window.location;
const url = new URL(str);
const productId = url.searchParams.get("id");
const objectURL = "http://localhost:3000/api/products/" + productId;

// Adding a product to cart 
function addToCart(productItem) {
  //declaration of variable productInLocalStorage 
  //in there will be the keys and values in localStorage 
  //JSON.parse can convert the data to format JSON in object JavaScript
  let productInLocalStorage = localStorage.getItem("cartItems");
  // if the card is empty
  if (productInLocalStorage === null) {
    let items = [productItem];
    let itemsStr = JSON.stringify(items); 
    localStorage.setItem("cartItems", itemsStr);
     // creating pop up message to confirm the element were added 
    alert("Produit ajouté au panier !"); 
  } else {
    // if the cart contain products from same id and same color
    let items = JSON.parse(productInLocalStorage);
    const resultat = items.find((product) => {
      if (product.id === productItem.id && product.color === productItem.color)
        return true;
      return false;
    });
    if (resultat != undefined) {
      items = items.map((item, index) => {
        if (item.id === productItem.id && item.color === productItem.color) {
          item.quantity += productItem.quantity;
        }
        return item;
      });
    } else {
      // if the card contain differents products
      items.push(productItem);
    }
    let itemsStr = JSON.stringify(items);
    localStorage.setItem("cartItems", itemsStr);
    alert("Produit ajouté au panier !");
  }
}

// Getting the products from the API 
function displayProduct() {
  //creating the good URL for each product choose by adding productId
  fetch("http://localhost:3000/api/products/" + productId)
    .then(function (res) {
      return res.json();
    })
    .catch((err) => {
      // error came
      console.log("erreur");
    })

    // we insert the data from the API to the DOM (title, img, name, price, description et option colors)
    .then(function (getProduct) {
      const product = getProduct;
   
      //insert title 
      let productTitle = document.querySelector("title");
      productTitle.textContent = `${product.name}`;
    
      //insert img
      let productImg = document.createElement("img");
      document.querySelector(".item__img").appendChild(productImg);
      productImg.setAttribute("src", `${product.imageUrl}`);
      productImg.setAttribute("alt", `${product.altTxt}`);

      //insert name
      let productName = document.getElementById("title");
      productName.textContent = `${product.name}`;

      //insert price 
      let productPrice = document.getElementById("price");
      productPrice.textContent = `${product.price}`;

      //insert description
      let productDescription = document.getElementById("description");
      productDescription.textContent = `${product.description}`;

      //colors
      document.querySelector("#colors").insertAdjacentHTML(
        "beforeend",
        product.colors.map(
          (color) =>
            `<option id= "valueColor" value="${color}">${color}</option>`
        )
      );
    });

  // making an eventListener when user will click to 'ajouter au panier' 
  const cartButton = document.getElementById("addToCart");
  // listen of the button and sending to cart 
  cartButton.addEventListener("click", (event) => {
    event.preventDefault();
    let productColor = document.getElementById("colors").value;
    let productQuantity = parseInt(document.getElementById("quantity").value);
    // if there is no color selected 
    if (productColor == "") {
      alert("Veuillez sélectionner une couleur");
      return;
    }
    // if quantity = 0
    else if (productQuantity == 0) {
      alert("Veuillez renseigner une quantité");
      return;
    }
    // We create a table that contain id, color and quantity of product added but not the price for the security
    const productOptions = {
      id: productId,
      color: productColor,
      quantity: productQuantity,
    };
    addToCart(productOptions);
  });
}
displayProduct();