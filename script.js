const products = [
  { id: 1, name: "Chaussures", price: 15000, image: "images/acd1.jpg" },
  { id: 2, name: "T-shirt Homme", price: 8000, image: "images/acd2.jpg" },
  { id: 3, name: "Casquette", price: 3000, image: "images/acd3.jpg" },
  { id: 4, name: "Sac à Dos", price: 12000, image: "images/acd4.jpg" }
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

  const name = document.getElementById('client-name').value.trim();
  const phone = document.getElementById('client-phone').value.trim();
  const address = document.getElementById('client-address').value.trim();

  if (!name || !phone || !address) {
    alert("Veuillez remplir toutes les informations.");
    return;
  }

  let message = `Bonjour, je suis ${name}. Voici ma commande :%0A`;
  cart.forEach(item => {
    message += `- ${item.name} x${item.qty}%0AImage: ${item.image}%0A`;
  });
  message += `%0ATotal: ${document.getElementById('cart-total').innerText} FCFA`;
  message += `%0A---%0ATéléphone: ${phone}%0AAdresse: ${address}`;

  const vendeurPhone = "237652439276"; // à modifier
  const url = `https://wa.me/${vendeurPhone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

// 📧 Envoi par email
function sendOrderEmail() {
  if (cart.length === 0) {
    alert("Votre panier est vide !");
    return;
  }

  const name = document.getElementById('client-name').value.trim();
  const phone = document.getElementById('client-phone').value.trim();
  const address = document.getElementById('client-address').value.trim();

  if (!name || !phone || !address) {
    alert("Veuillez remplir toutes les informations.");
    return;
  }

  let subject = `Commande - ${name}`;
  let body = `Bonjour, je suis ${name}. Voici ma commande :%0D`;
  cart.forEach(item => {
    body += `- ${item.name} x${item.qty}%0DImage: ${item.image}%0D`;
  });
  body += `Total: ${document.getElementById('cart-total').innerText} FCFA`;
  body += `%0D---%0DTéléphone: ${phone}%0DAdresse: ${address}`;

  const vendeurEmail = "lecreateur2006@gmail.com";
  window.location.href = `mailto:${vendeurEmail}?subject=${encodeURIComponent(subject)}&body=${body}`;
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
    li.style.display = 'flex';
    li.style.alignItems = 'center';
    li.style.marginBottom = '10px';

    const img = document.createElement('img');
    img.src = item.image;
    img.alt = item.name;
    img.style.width = '40px';
    img.style.height = '40px';
    img.style.objectFit = 'cover';
    img.style.borderRadius = '5px';
    img.style.marginRight = '10px';

    const text = document.createElement('span');
    text.innerText = `${item.name} x${item.qty}`;

    const removeBtn = document.createElement('button');
    removeBtn.innerText = '❌';
    removeBtn.style.marginLeft = 'auto';
    removeBtn.onclick = () => removeFromCart(item.id);

    li.appendChild(img);
    li.appendChild(text);
    li.appendChild(removeBtn);

    cartItems.appendChild(li);
  });

  document.getElementById('cart-total').innerText = total;
  document.getElementById('cart-count').innerText = cart.reduce((sum, i) => sum + i.qty, 0);
}
