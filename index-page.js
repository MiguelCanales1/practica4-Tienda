// js/index-page.js

const PER_PAGE = 4;
let currentPage = 1;
let currentProductForModal = null;

document.addEventListener("DOMContentLoaded", () => {
  renderPage(currentPage);
  updateCartBadge();
});

function renderPage(page) {
  fetchProducts(page, PER_PAGE).then(({ items, totalPages }) => {
    renderProducts(items);
    renderPagination(page, totalPages);
  });
}

function renderProducts(products) {
  const container = document.getElementById("products-container");
  container.innerHTML = "";

  products.forEach((product) => {
    const col = document.createElement("div");
    col.className = "col-lg-3 col-md-4 col-sm-12 mb-4";

    col.innerHTML = `
      <div class="card h-100">
        <img src="${product.image}" class="card-img-top" alt="${product.name}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">$${product.price.toLocaleString("es-MX")} MXN</p>
          <button
            class="btn btn-primary mt-auto"
            data-product-id="${product.id}"
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    `;

    container.appendChild(col);
  });

  container.querySelectorAll("button[data-product-id]").forEach((btn) => {
    btn.addEventListener("click", onClickAddToCart);
  });
}

function renderPagination(current, totalPages) {
  const ul = document.getElementById("pagination");
  ul.innerHTML = "";

  const prevLi = document.createElement("li");
  prevLi.className = `page-item ${current === 1 ? "disabled" : ""}`;
  prevLi.innerHTML = `
    <button class="page-link" ${current === 1 ? "tabindex='-1' aria-disabled='true'" : ""}>
      &laquo;
    </button>
  `;
  prevLi.addEventListener("click", () => {
    if (current > 1) {
      currentPage--;
      renderPage(currentPage);
    }
  });
  ul.appendChild(prevLi);

  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement("li");
    li.className = `page-item ${i === current ? "active" : ""}`;
    li.innerHTML = `<button class="page-link">${i}</button>`;
    li.addEventListener("click", () => {
      currentPage = i;
      renderPage(currentPage);
    });
    ul.appendChild(li);
  }

  const nextLi = document.createElement("li");
  nextLi.className = `page-item ${
    current === totalPages ? "disabled" : ""
  }`;
  nextLi.innerHTML = `
    <button class="page-link" ${
      current === totalPages ? "tabindex='-1' aria-disabled='true'" : ""
    }>
      &raquo;
    </button>
  `;
  nextLi.addEventListener("click", () => {
    if (current < totalPages) {
      currentPage++;
      renderPage(currentPage);
    }
  });
  ul.appendChild(nextLi);
}

function onClickAddToCart(e) {
  const btn = e.currentTarget;
  const id = Number(btn.getAttribute("data-product-id"));
  const allProducts = getStoredProducts();
  const product = allProducts.find((p) => p.id === id);
  if (!product) return;

  currentProductForModal = product;

  document.getElementById("modal-product-name").textContent = product.name;
  document.getElementById(
    "modal-product-price"
  ).textContent = `$${product.price.toLocaleString("es-MX")} MXN`;
  document.getElementById("modal-product-quantity").value = 1;

  const modal = new bootstrap.Modal(
    document.getElementById("addToCartModal")
  );
  modal.show();

  const confirmBtn = document.getElementById("confirm-add-to-cart");
  confirmBtn.onclick = () => {
    const qtyInput = document.getElementById("modal-product-quantity");
    const quantity = Number(qtyInput.value) || 1;
    addToCart(currentProductForModal, quantity);
    updateCartBadge();
    modal.hide();
  };
}

function updateCartBadge() {
  const badge = document.getElementById("cart-count-badge");
  if (!badge) return;
  badge.textContent = getCartCount();
}
