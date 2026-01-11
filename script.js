// Cart Object
let cart = {};

// Add item
function addItem(item) {
  cart[item] = (cart[item] || 0) + 1;
  renderCart();
}

// Increase / Decrease Quantity
function increase(item) {
  cart[item]++;
  renderCart();
}
function decrease(item) {
  cart[item]--;
  if (cart[item] <= 0) delete cart[item];
  renderCart();
}

// Render cart items
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

// Get order text
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

