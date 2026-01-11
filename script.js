// Menu items with price (in ₹) & category
const menuData = {
  "Paneer Tikka": {price: 300, category: "Starter Veg"},
  "Veg Spring Roll": {price: 200, category: "Starter Veg"},
  "Chicken Tikka": {price: 350, category: "Starter Non-Veg"},
  "Fish Amritsari": {price: 400, category: "Starter Non-Veg"},
  "Dal Makhani": {price: 250, category: "Main Course Veg"},
  "Paneer Butter Masala": {price: 300, category: "Main Course Veg"},
  "Butter Chicken": {price: 350, category: "Main Course Non-Veg"},
  "Mutton Rogan Josh": {price: 450, category: "Main Course Non-Veg"},
  "Roti": {price: 20, category: "Main Course Veg"} // example
};

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

// Format number as ₹
function formatRupees(amount) {
  return `₹${amount}`;
}

// Function to clear cart
function clearCart() {
  cart = {};
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
  let total = 0;

  for (let item in cart) {
    const price = menuData[item]?.price || 0;
    const category = menuData[item]?.category || "";
    const itemTotal = price * cart[item];
    total += itemTotal;

    html += `
      <div class="cart-item">
        <span>${item} (${category}) - ${formatRupees(price)}</span>
        <div>
          <button class="qty-btn" onclick="decrease('${item}')">−</button>
          <strong>${cart[item]}</strong>
          <button class="qty-btn" onclick="increase('${item}')">+</button>
        </div>
        <span>= ${formatRupees(itemTotal)}</span>
      </div>
    `;
  }

  html += `<hr><h3>Total: ${formatRupees(total)}</h3>`;
  container.innerHTML = html;
}

// Get order text with total for WhatsApp/Email
function orderText() {
  let text = "Order Details:\n";
  let total = 0;
  for (let item in cart) {
    const price = menuData[item]?.price || 0;
    const category = menuData[item]?.category || "";
    const itemTotal = price * cart[item];
    total += itemTotal;
    text += `${item} (${category}) x ${cart[item]} = ${formatRupees(itemTotal)}\n`;
  }
  text += `\nTotal: ${formatRupees(total)}`;
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
    `https://wa.me/916388442976?text=${encodeURIComponent(message)}`,
    "_blank"
  );
  
  // Clear cart after sending
  clearCart();
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
