const url = "http://localhost:3000/api/products";

fetch(url)
  .then((res) => res.json())
  .then((canap) => loop(canap))
  .catch((error) => console.log(error));

loop = (canaps) => {
  let items = document.getElementById("items");
  for (canap of canaps) {
    items.innerHTML += HtmlInjection(canap);
  }
};

HtmlInjection = (canap) => {
  return `
        <a href="./product.html?id=${canap.id}">
            <article>
            <img src="${canap.imageUrl}" alt="${canap.altTxt}">
            <h3 class="productName">${canap.name}</h3>
            <p class="productDescription">${canap.description}</p>
            </article>
        </a>
     `;
};
