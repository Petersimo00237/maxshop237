const products = [
  { id: 1, name: "Chaussures", price: 15000, image: "acd1.jpg" },
  { id: 2, name: "T-shirt Homme", price: 8000, image: "acd2.jpg" },
  { id: 3, name: "Casquette", price: 3000, image: "acd3.jpg" },
  { id: 4, name: "Sac à Dos", price: 12000, image: "acd4.jpg" }
];

let cart = [];

function displayProducts() {
  const container = document.getElementById('products');
  container.innerHTML = '';
  const search = document.getElementById('searchInput').value.toLowerCase();

  products
    .filter(product => product.name.toLowerCase().includes(search))
    .forEach(product => {
      const div = document.createElement('div');
      div.className = 'product';
      div.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.price} FCFA</p>
        <button onclick="addToCart(${product.id})">Ajouter</button>
      `;
      container.appendChild(div);
    });
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCart();
}


function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCart();
}

function clearCart() {
  cart = [];
  updateCart();
}

function toggleCart() {
  const cartEl = document.getElementById('cart');
  cartEl.classList.toggle('closed');
  cartEl.classList.toggle('open');
}

// 📩 Envoi WhatsApp
function sendOrderWhatsApp() {
  if (cart.length === 0) {
    alert("Votre panier est vide !");
    return;
  }

  let message = "Bonjour, je souhaite commander :%0A";
  cart.forEach(item => {
    message += `- ${item.name} x${item.qty}%0AImage: ${item.image}%0A`;
  });
  message += `%0ATotal: ${document.getElementById('cart-total').innerText} FCFA`;

  const phone = "237652439276"; // ton numéro
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

// 📧 Envoi par email
function sendOrderEmail() {
  if (cart.length === 0) {
    alert("Votre panier est vide !");
    return;
  }

  let subject = "Commande Boutique";
  let body = "Bonjour, je souhaite commander :%0D%0A";
  cart.forEach(item => {
    body += `- ${item.name} x${item.qty}%0D%0AImage: ${item.image}%0D%0A`;
  });
  body += `%0D%0ATotal: ${document.getElementById('cart-total').innerText} FCFA`;

  const email = "lecreateur2006@gmail.com";
  window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
}

document.getElementById('searchInput').addEventListener('input', displayProducts);

window.onload = () => {
  displayProducts();
  document.getElementById('cart').classList.add('closed');
};

function updateCart() {
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;
    const li = document.createElement('li');
    li.innerHTML = `
      <img src="${item.image}" alt="${item.name}" style="width:40px;height:40px;border-radius:4px;margin-right:5px;vertical-align:middle;">
      ${item.name} x${item.qty}
      <button onclick="removeFromCart(${item.id})" style="float:right;">❌</button>
    `;
    cartItems.appendChild(li);
  });

  document.getElementById('cart-total').innerText = total;
  document.getElementById('cart-count').innerText = cart.reduce((sum, i) => sum + i.qty, 0);
}
