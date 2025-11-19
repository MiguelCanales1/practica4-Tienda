// js/admin-page.js

let editingId = null;

document.addEventListener("DOMContentLoaded", () => {
  renderProductsTable();

  const form = document.getElementById("product-form");
  form.addEventListener("submit", onSubmitForm);

  document
    .getElementById("btn-clear-form")
    .addEventListener("click", clearForm);
});

function renderProductsTable() {
  const tbody = document.getElementById("products-table-body");
  tbody.innerHTML = "";

  const products = getStoredProducts();

  products.forEach((p) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${p.id}</td>
      <td>${p.name}</td>
      <td>$${p.price.toLocaleString("es-MX")}</td>
      <td>
        <img src="${p.image}" alt="${p.name}" style="width:60px; height:60px; object-fit:cover;">
      </td>
      <td>
        <button class="btn btn-sm btn-warning me-2" data-id="${p.id}" data-action="edit">Editar</button>
        <button class="btn btn-sm btn-danger" data-id="${p.id}" data-action="delete">Eliminar</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  tbody.querySelectorAll("button[data-action='edit']").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.getAttribute("data-id"));
      loadProductToForm(id);
    });
  });

  tbody.querySelectorAll("button[data-action='delete']").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.getAttribute("data-id"));
      deleteProduct(id);
    });
  });
}

function onSubmitForm(event) {
  event.preventDefault();
  const nameInput = document.getElementById("product-name");
  const priceInput = document.getElementById("product-price");
  const imageInput = document.getElementById("product-image");

  const name = nameInput.value.trim();
  const price = Number(priceInput.value);
  const image = imageInput.value.trim();

  if (!name || isNaN(price) || !image) {
    alert("Completa todos los campos correctamente.");
    return;
  }

  const products = getStoredProducts();

  if (editingId === null) {
    // Crear nuevo
    const newId =
      products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
    products.push({ id: newId, name, price, image });
  } else {
    // Actualizar existente
    const idx = products.findIndex((p) => p.id === editingId);
    if (idx !== -1) {
      products[idx] = { id: editingId, name, price, image };
    }
  }

  saveProducts(products);
  clearForm();
  renderProductsTable();
}

function clearForm() {
  editingId = null;
  document.getElementById("product-id").value = "";
  document.getElementById("product-name").value = "";
  document.getElementById("product-price").value = "";
  document.getElementById("product-image").value = "";
  document.getElementById("form-title").textContent = "Crear producto";
}

function loadProductToForm(id) {
  const products = getStoredProducts();
  const product = products.find((p) => p.id === id);
  if (!product) return;

  editingId = product.id;
  document.getElementById("product-id").value = product.id;
  document.getElementById("product-name").value = product.name;
  document.getElementById("product-price").value = product.price;
  document.getElementById("product-image").value = product.image;
  document.getElementById("form-title").textContent =
    "Editar producto (ID " + product.id + ")";
}

function deleteProduct(id) {
  if (!confirm("¿Seguro que deseas eliminar este producto?")) return;

  let products = getStoredProducts();
  products = products.filter((p) => p.id !== id);
  saveProducts(products);
  if (editingId === id) {
    clearForm();
  }
  renderProductsTable();
}
