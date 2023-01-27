let sofa;
//calling API products 

//asking fetch to get data from URL of API
const fetchSofa = async () => {
//waiting for the answer 
    await fetch('http://localhost:3000/api/products') 
//the first promise will get then answer, transformed in json. 
        .then(res => res.json())
        .then(JSON => products = JSON) 
//giving message error in case the server is not working.
        .catch((error) => console.error(error));
        console.log(sofa)
};

//Function that will tie html to api
//asynchrone function and then waiting the product
const displaySofa = async () => {  
     await fetchSofa();
//starting from a table and then we browse it, product will take the value to each product at each tour 
    products.forEach(product => {

//get the element #items in index.html   
        let items = document.getElementById("items");

//insert links
        let link = document.createElement("a");
        link.setAttribute('href', "product.html?id=" + product._id);
        items.appendChild(link);

//insert articles
        let article = document.createElement("article");
        link.appendChild(article);

//adding the image 
        let images = document.createElement("img");
        images.setAttribute('src', product.imageUrl);
        images.setAttribute('alt', product.altTxt);
        article.appendChild(images);

//adding title (h3)
        let title = document.createElement("h3");
        title.innerHTML = product.name;
        article.appendChild(title);

//adding description 
        let description = document.createElement("p");
        article.appendChild(description);
        description.innerHTML = product.description;
    }
    );
};
displaySofa(); //and then we call the element 
