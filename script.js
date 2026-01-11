// Initialize cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || {};

// Save cart to localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Add item to cart
function addItem(item) {
  cart[item] = (cart[item] || 0) + 1;
  saveCart();
  renderCart();
}

// Increase / decrease quantity
function increase(item) {
  cart[item]++;
  saveCart();
  renderCart();
}
function decrease(item) {
  cart[item]--;
  if (cart[item] <= 0) delete cart[item];
  saveCart();
  renderCart();
}

// Render cart on Cart page
function renderCart() {
  const container = document.getElementById("cartItems");
  if (!container) return;

  if (Object.keys(cart).length === 0) {
    container.innerHTML = "Cart is empty";
    return;
  }

  let html = "";
  for (let item in cart) {
    html += `
      <div class="cart-item">
        <span>${item}</span>
        <div>
          <button class="qty-btn" onclick="decrease('${item}')">−</button>
          <strong>${cart[item]}</strong>
          <button class="qty-btn" onclick="increase('${item}')">+</button>
        </div>
      </div>
    `;
  }
  container.innerHTML = html;
}

// Get order text for WhatsApp/Email
function orderText() {
  let text = "Order Details:\n";
  for (let item in cart) {
    text += `${item} x ${cart[item]}\n`;
  }
  return text;
}

// Send order via WhatsApp
function sendWhatsApp() {
  const name = document.getElementById("name")?.value;
  const phone = document.getElementById("phone")?.value;

  if (!name || !phone || Object.keys(cart).length === 0) {
    alert("Please add items and fill customer details");
    return;
  }

  const message =
`New Order – The Rajputana Darbar

Customer: ${name}
Phone: ${phone}

${orderText()}`;

  window.open(
    `https://wa.me/+916388442976?text=${encodeURIComponent(message)}`,
    "_blank"
  );
}

// Send order via Email
function sendEmail() {
  const name = document.getElementById("name")?.value;
  const phone = document.getElementById("phone")?.value;

  if (!name || !phone || Object.keys(cart).length === 0) {
    alert("Please add items and fill customer details");
    return;
  }

  const subject = "New Order | The Rajputana Darbar";
  const body =
`Customer: ${name}
Phone: ${phone}

${orderText()}`;

  window.location.href =
    `mailto:drajputanadarbar@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// Render cart automatically on load
document.addEventListener("DOMContentLoaded", () => {
  renderCart();
});
