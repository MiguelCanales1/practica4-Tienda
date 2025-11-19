// js/products.js

// Productos por defecto 
const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: "Air Jordan 1 Retro High",
    price: 4500,
    image:
      "https://cdn-images.farfetch-contents.com/18/31/64/89/18316489_41349181_1000.jpg",
  },
  {
    id: 2,
    name: "Air Jordan 4 Retro",
    price: 5200,
    image:
      "https://cdn-images.farfetch-contents.com/15/05/76/88/15057688_25617121_1000.jpg",
  },
  {
    id: 3,
    name: "Air Jordan 11 Retro",
    price: 6000,
    image:
      "https://cdn-images.farfetch-contents.com/13/55/56/67/13555667_59827501_1000.jpg",
  },
  {
    id: 4,
    name: "Air Jordan 3 Retro",
    price: 4800,
    image:
      "https://cdn-images.farfetch-contents.com/14/89/92/25/14899225_25641303_1000.jpg",
  },
  {
    id: 5,
    name: "Air Jordan 5 Retro",
    price: 5100,
    image:
      "https://cdn-images.farfetch-contents.com/16/06/54/11/16065411_31207448_1000.jpg",
  },
  {
    id: 6,
    name: "Air Jordan 6 Retro",
    price: 5300,
    image:
      "https://cdn-images.farfetch-contents.com/13/81/21/06/13812106_17043783_1000.jpg",
  },
];

const PRODUCTS_KEY = "jordan_products";

// Obtiene productos desde sessionStorage o usa los de defecto
function getStoredProducts() {
  const raw = sessionStorage.getItem(PRODUCTS_KEY);
  if (!raw) return [...DEFAULT_PRODUCTS];
  try {
    const data = JSON.parse(raw);
    if (Array.isArray(data) && data.length > 0) {
      return data;
    }
    return [...DEFAULT_PRODUCTS];
  } catch {
    return [...DEFAULT_PRODUCTS];
  }
}

function saveProducts(products) {
  sessionStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

// Simula llamada al servidor con paginación
function fetchProducts(page = 1, perPage = 4) {
  const all = getStoredProducts();
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const items = all.slice(startIndex, endIndex);
  const totalPages = Math.ceil(all.length / perPage);

  return Promise.resolve({
    items,
    totalPages,
  });
}
