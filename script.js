// Menu items with price (₹) & category
const menuData = {
  "Paneer Tikka": {price: 300, category: "Starter Veg"},
  "Veg Spring Roll": {price: 200, category: "Starter Veg"},
  "Chicken Tikka": {price: 350, category: "Starter Non-Veg"},
  "Fish Amritsari": {price: 400, category: "Starter Non-Veg"},
  "Dal Makhani": {price: 250, category: "Main Course Veg"},
  "Paneer Butter Masala": {price: 300, category: "Main Course Veg"},
  "Butter Chicken": {price: 350, category: "Main Course Non-Veg"},
  "Mutton Rogan Josh": {price: 450, category: "Main Course Non-Veg"},
  "Roti": {price: 20, category: "Main Course Veg"}
};

// Initialize cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || {};

// Save cart to localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateMenuQuantities();
  renderCart(); // also update cart page
}

// Add or remove item
function increase(item) {
  cart[item] = (cart[item] || 0) + 1;
  saveCart();
}

function decrease(item) {
  if (!cart[item]) return;
  cart[item]--;
  if (cart[item] <= 0) delete cart[item];
  saveCart();
}

// Update menu page quantities
function updateMenuQuantities() {
  for (let item in menuData) {
    const qtySpan = document.getElementById(`qty-${item}`);
    if (qtySpan) {
      qtySpan.textContent = cart[item] || 0;
    }
  }
}

// Format number as ₹
function formatRupees(amount) {
  return `₹${amount}`;
}

// Render cart on order page
function renderCart() {
  const container = document.getElementById("cartItems");
  if (!container) return;

  if (Object.keys(cart).length === 0) {
    container.innerHTML = "Cart is empty";
    return;
  }

  let html = "";
  let total = 0;
  for (let item in cart) {
    const price = menuData[item].price;
    const category = menuData[item].category;
    const itemTotal = price * cart[item];
    total += itemTotal;

    html += `
      <div class="cart-item">
        <span>${item} (${category}) - ${formatRupees(price)}</span>
        <div>
          <button onclick="decrease('${item}')">−</button>
          <strong>${cart[item]}</strong>
          <button onclick="increase('${item}')">+</button>
        </div>
        <span>= ${formatRupees(itemTotal)}</span>
      </div>
    `;
  }
  html += `<hr><h3>Total: ${formatRupees(total)}</h3>`;
  container.innerHTML = html;
}

// Generate order text
function orderText() {
  let text = "Order Details:\n";
  let total = 0;
  for (let item in cart) {
    const price = menuData[item].price;
    const category = menuData[item].category;
    const itemTotal = price * cart[item];
    total += itemTotal;
    text += `${item} (${category}) x ${cart[item]} = ${formatRupees(itemTotal)}\n`;
  }
  text += `\nTotal: ${formatRupees(total)}`;
  return text;
}

// Clear cart
function clearCart() {
  cart = {};
  saveCart();
}

// WhatsApp order
function sendWhatsApp() {
  const name = document.getElementById("name")?.value.trim();
  const phone = document.getElementById("phone")?.value.trim();

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
    `https://wa.me/916388442976?text=${encodeURIComponent(message)}`,
    "_blank"
  );

  clearCart();
}

// Email order
function sendEmail() {
  const name = document.getElementById("name")?.value.trim();
  const phone = document.getElementById("phone")?.value.trim();

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
    `mailto:YOUR_EMAIL@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  clearCart();
}

// On page load
document.addEventListener("DOMContentLoaded", () => {
  updateMenuQuantities(); // menu quantities sync
  renderCart();           // render cart if on cart page
});
