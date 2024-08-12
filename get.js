import express, { response } from "express";
const app = express();
const port = 3000;
const newsArticles = [
  {
    id: 1,
    title: "Breaking News",
    category: "general",
    content: "Lorem ipsum...",
  },
  {
    id: 2,
    title: "Tech Update",
    category: "technology",
    content: "Lorem ipsum...",
  },
  {
    id: 3,
    title: "Sports Highlights",
    category: "sports",
    content: "Lorem ipsum...",
  },
  {
    id: 4,
    title: "animals sweety",
    category: "sanimals",
    content: "Lorem ipsum...",
  },
];
const categories = {
  electronics: [
    { id: 1, name: "Laptop", price: 999 },
    { id: 2, name: "Phone", price: 699 },
  ],
  furniture: [
    { id: 3, name: "Table", price: 199 },
    { id: 4, name: "Chair", price: 99 },
  ],
};
const products = [
  { id: 1, name: "Laptop", price: 999 },
  { id: 2, name: "Phone", price: 699 },
  { id: 3, name: "Tablet", price: 399 },
];
app.get("/hello/:id", (request, response) => {
  const id = request.params.id;
  const edad = request.query.edad;
  const cabello = request.query.cabello;
  response.send({
    id,
    edad,
    cabello,
  });
});

app.get("/lista/:numero", (req, res) => {
  const numero = req.params.numero;
  let arreglo = [];
  for (let i = 1; i <= numero; i++) {
    arreglo.push(i);
  }
  res.send({
    arreglo,
  });
});

app.get("/categories/:category/products", (req, res) => {
  const category = req.params.category;
  const categoryProducts = categories[category];
  if (categoryProducts) {
    res.json(categories[category]);
  } else {
    res.status(404).send({ mensaje: "categoria no encontrada" });
  }
});
app.get("/products", (req, res) => {
  res.json(products);
});
app.get("/products/filter", (req, res) => {
  const minPrice = Number(req.query.minPrice);
  const maxPrice = Number(req.query.maxPrice);
  const filterProducts = products.filter((value) => {
    return value.price >= minPrice && value.price <= maxPrice;
  });
  if (filterProducts.length > 0) {
    res.json(filterProducts);
  } else {
    res.status(404).json({ mensaje: "no se han encontrado productos" });
  }
});

app.get("/products/:id", (req, res) => {
  const id = Number(req.params.id);
  let product = null;

  for (let i = 0; i < products.length; i++) {
    if (products[i].id === id) {
      product = products[i];
      break;
    }
  }

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ mensaje: "Producto no encontrado" });
  }
});

app.get("/AleNumbers", (req, res) => {
  let min = Number(req.query.min);
  let max = Number(req.query.max);
  if (min > max) {
    [min, max] = [max, min];
  }

  const AleNumbers = Math.random() * (max - min) + min;

  res.json(AleNumbers);
});
app.get("/news", (req, res) => {
  const category = req.query.category;

  if (category) {
    const filterA = newsArticles.filter(
      (article) => article.category === category
    );
    return res.json(filterA);
  }

  res.json(newsArticles);
});

app.listen(port, () => {
  console.log("el server esta corriendo en el puerto " + port);
});
