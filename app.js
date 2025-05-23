// Toggle sidebar menu
const menuToggle = document.getElementById('menu-toggle');
const sidebarMenu = document.getElementById('sidebar-menu');

menuToggle.addEventListener('click', (e) => {
  e.preventDefault();
  sidebarMenu.classList.toggle('active');
});

// Toggle sidebar cart
const cartToggle = document.getElementById('cart-toggle');
const sidebarCart = document.getElementById('sidebar-cart');

cartToggle.addEventListener('click', (e) => {
  e.preventDefault();
  sidebarCart.classList.toggle('active');
});

// Close sidebars when clicking outside
document.addEventListener('click', (e) => {
  if (!sidebarMenu.contains(e.target) && !menuToggle.contains(e.target)) {
    sidebarMenu.classList.remove('active');
  }
  if (!sidebarCart.contains(e.target) && !cartToggle.contains(e.target)) {
    sidebarCart.classList.remove('active');
  }
});

const cart = [];
const cartSummary = sidebarCart.querySelector('.cart-summary');

function renderCart() {
  cartSummary.innerHTML = `<h3>Keranjang Kamu</h3>`;

  if (cart.length === 0) {
    cartSummary.innerHTML += '<p>silahkan tambah produk !!!!</p>';
    return;
  }

  let totalPrice = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.qty;
    totalPrice += itemTotal;

    const cartBox = document.createElement('div');
    cartBox.classList.add('cart-box');

    cartBox.innerHTML = `
      <img src="images/${item.name.toLowerCase()}.jpeg" alt="${item.name}" class="cart-img" />
      <div class="cart-detail">
        <p>Name: ${item.name}</p>
        <p>Ukuran: ${item.size}</p>
        <p>Jumlah: ${item.qty}</p>
        <p>Harga: Rp${itemTotal.toLocaleString()}</p>
        <button class="delete-btn" data-index="${index}">Hapus</button>
      </div>
    `;

    cartSummary.appendChild(cartBox);
  });

  const totalEl = document.createElement('h4');
  totalEl.textContent = `Total: Rp${totalPrice.toLocaleString()}`;
  cartSummary.appendChild(totalEl);

  // Pasang event listener tombol hapus
  cartSummary.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = e.target.dataset.index;
      if (idx !== undefined) {
        cart.splice(idx, 1);
        renderCart();
      }
    });
  });
}

// Toggle ukuran produk (select size)
document.querySelectorAll('.size-buttons').forEach(sizeContainer => {
  sizeContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('size-btn')) {
      sizeContainer.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('selected'));
      e.target.classList.add('selected');
    }
  });
});

// Tambah keranjang dan render sidebar
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();

    const productCard = e.target.closest('.product-card');
    if (!productCard) return;

    const productName = productCard.querySelector('.product-name').textContent.trim();
    const productPriceText = productCard.querySelector('.product-price').textContent.trim();
    const productPrice = parseInt(productPriceText.replace(/[^0-9]/g, ''));
    const selectedSizeBtn = productCard.querySelector('.size-btn.selected');
    const selectedSize = selectedSizeBtn ? selectedSizeBtn.textContent.trim() : null;

    if (!selectedSize) {
      alert('Silakan pilih ukuran terlebih dahulu!');
      return;
    }

    const existingIndex = cart.findIndex(item => item.name === productName && item.size === selectedSize);
    if (existingIndex > -1) {
      cart[existingIndex].qty += 1;
    } else {
      cart.push({
        name: productName,
        size: selectedSize,
        price: productPrice,
        qty: 1,
      });
    }

    renderCart();
  });
});

// Render keranjang awal (kosong)
renderCart();



