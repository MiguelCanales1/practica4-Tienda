// js/cart-page.js

document.addEventListener("DOMContentLoaded", () => {
  renderCart();

  document
    .getElementById("btn-checkout")
    .addEventListener("click", onCheckout);
});

function renderCart() {
  const cart = getCart();
  const container = document.getElementById("cart-items");
  const emptyAlert = document.getElementById("cart-empty");
  const totalSpan = document.getElementById("cart-total");

  container.innerHTML = "";

  if (cart.length === 0) {
    emptyAlert.classList.remove("d-none");
    totalSpan.textContent = "0";
    return;
  } else {
    emptyAlert.classList.add("d-none");
  }

  cart.forEach((item) => {
    const row = document.createElement("div");
    row.className =
      "d-flex align-items-center border rounded p-3 mb-3 gap-3 flex-wrap";

    row.innerHTML = `
      <img src="${item.image}" width="100" alt="${item.name}">
      <div class="flex-grow-1">
        <h5>${item.name}</h5>
        <p class="mb-1">$${item.price.toLocaleString("es-MX")} MXN</p>
        <div class="d-flex align-items-center gap-2">
          <label class="form-label mb-0">Cantidad:</label>
          <input
            type="number"
            min="1"
            value="${item.quantity}"
            class="form-control form-control-sm w-auto cart-qty-input"
            data-id="${item.id}"
          >
          <button
            class="btn btn-sm btn-danger cart-delete-btn"
            data-id="${item.id}"
          >
            Eliminar
          </button>
        </div>
      </div>
      <div class="text-end ms-auto">
        <p class="fw-bold mb-0">
          Subtotal: $${(item.price * item.quantity).toLocaleString("es-MX")} MXN
        </p>
      </div>
    `;

    container.appendChild(row);
  });

  attachCartEvents();
  updateTotal();
}

function attachCartEvents() {
  document.querySelectorAll(".cart-qty-input").forEach((input) => {
    input.addEventListener("change", (e) => {
      const id = Number(e.target.getAttribute("data-id"));
      const qty = Number(e.target.value) || 1;
      updateCartQuantity(id, qty);
      renderCart();
    });
  });

  document.querySelectorAll(".cart-delete-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = Number(e.target.getAttribute("data-id"));
      removeFromCart(id);
      renderCart();
    });
  });
}

function updateTotal() {
  const totalSpan = document.getElementById("cart-total");
  totalSpan.textContent = getCartTotal().toLocaleString("es-MX");
}

function onCheckout() {
  const cart = getCart();
  if (cart.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  alert("Compra realizada (simulada). Se vaciará el carrito.");

  saveCart([]);
  renderCart();

  window.location.href = "orders.html";
}
