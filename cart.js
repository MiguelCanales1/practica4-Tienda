// js/cart.js

const CART_KEY = "jordan_cart";

// Leer carrito desde sessionStorage
function getCart() {
  const raw = sessionStorage.getItem(CART_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

// Guardar carrito en sessionStorage
function saveCart(cart) {
  sessionStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// Agregar producto
function addToCart(product, quantity) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
    });
  }
  saveCart(cart);
}

// Actualizar cantidad
function updateCartQuantity(productId, quantity) {
  const cart = getCart();
  const item = cart.find((p) => p.id === productId);
  if (item) {
    item.quantity = quantity;
    if (item.quantity <= 0) {
      const index = cart.indexOf(item);
      cart.splice(index, 1);
    }
    saveCart(cart);
  }
}

// Eliminar producto del carrito
function removeFromCart(productId) {
  const cart = getCart().filter((item) => item.id !== productId);
  saveCart(cart);
}

// Calcular total
function getCartTotal() {
  return getCart().reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
}

// Contar ítems (para badge)
function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}
