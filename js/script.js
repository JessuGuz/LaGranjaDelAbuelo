// Inicializar carrito de compras desde LocalStorage
let carrito = JSON.parse(localStorage.getItem("carritoLocal")) || [];

// Stock inicial por id de producto
/* let stock = {
  1: 10, 2: 15, 3: 20, 4: 12, 5: 5, 6: 8, 7: 9, 8: 10,
  9: 7, 10: 14, 11: 10, 12: 11, 13: 13, 14: 6, 15: 10,
  16: 10, 17: 15, 18: 20, 19: 12, 20: 5, 21: 8, 22: 9, 23: 10,
  24: 7, 25: 14, 26: 10, 27: 11, 28: 13, 29: 6, 30: 10,
  31: 10, 32: 15, 33: 20, 34: 12, 35: 5, 36: 8,
}; */
let stock = {};
for (let i = 1; i <= 36; i++) {
  stock[i] = Math.floor(Math.random() * (20 - 5 + 1)) + 5; // Valores entre 5 y 20
}

// Referencias a elementos del DOM
const modalCarrito = document.getElementById("modal-carrito");
const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total-carrito");
const cerrarCarrito = document.getElementById("cerrar-carrito");

const contenedoresProductos = document.querySelectorAll(".product-content");

function actualizarCarrito() {
  listaCarrito.innerHTML = "";
  let total = 0;

  carrito.forEach((producto, index) => {
    total += producto.price * producto.cantidad;

    const item = document.createElement("li");
    item.classList.add("carrito-item");
    item.innerHTML = `
    <div class="carrito-item-imagen">
        <img src="${producto.image}" alt="${producto.title}" style="width: 150px; height: 100px;" />
      </div>
      <div class="carrito-item-detalles">
      <span>${producto.title} - $${producto.price.toFixed(2)}</span>
      <div class="acciones-item">
        <button class="btn-cantidad btn-menos" data-index="${index}">-</button>
        <span class="cantidad">${producto.cantidad}</span>
        <button class="btn-cantidad btn-mas" data-index="${index}">+</button>
        <button class="btn-eliminar" data-index="${index}">x</button>
      </div>
      </div>
    `;
    listaCarrito.appendChild(item);
  });

  totalCarrito.textContent = `$${total.toFixed(2)}`;
}

function agregarAlCarrito(id, title, price, image) {
  if (stock[id] <= 0) {
    alert("Producto agotado.");
    return;
  }
  const producto = carrito.find((prod) => prod.id === id);

  if (producto) {
    producto.cantidad++;
  } else {
    carrito.push({ id, title, price, image, cantidad: 1 });
  }

  stock[id]--;
  localStorage.setItem("carritoLocal", JSON.stringify(carrito));
  actualizarCarrito();
}

contenedoresProductos.forEach((contenedor) => {
  contenedor.addEventListener("click", (e) => {
  if (e.target.classList.contains("agregar-carrito")) {
    e.preventDefault();
    const card = e.target.closest(".prod");
    const id = parseInt(e.target.dataset.id);
    const title = card.querySelector("h3").textContent;
    const price = parseFloat(card.querySelector(".precio").textContent.replace(/[^\d.]/g, ""));/* ("$", "")); */
    const image = card.querySelector("img").src;

    agregarAlCarrito(id, title, price, image);
  } else if (e.target.tagName === "IMG") {
    const card = e.target.closest(".product");
    const title = card.querySelector("h3").textContent;
    alert(`Descripción del producto: ${title}`);
  }
});
});

listaCarrito.addEventListener("click", (e) => {
  const index = e.target.dataset.index;

  if (e.target.classList.contains("btn-eliminar")) {
    const producto = carrito[index];
    stock[producto.id] += producto.cantidad;
    carrito.splice(index, 1);
  } else if (e.target.classList.contains("btn-menos")) {
    const producto = carrito[index];
    if (producto.cantidad > 1) {
      producto.cantidad--;
      stock[producto.id]++;
    } else {
      stock[producto.id]++;
      carrito.splice(index, 1);
    }
  } else if (e.target.classList.contains("btn-mas")) {
    const producto = carrito[index];
    if (stock[producto.id] > 0) {
      producto.cantidad++;
      stock[producto.id]--;
    } else {
      alert("Producto agotado.");
    }
  }

  localStorage.setItem("carritoLocal", JSON.stringify(carrito));
  actualizarCarrito();
});

document.getElementById("carrito-btn").addEventListener("click", () => {
  modalCarrito.style.display = "block";
  actualizarCarrito();
});

cerrarCarrito.addEventListener("click", () => {
  modalCarrito.style.display = "none";
});

document.getElementById('comprar-btn').addEventListener('click', () => {
    document.getElementById('formulario-pago').style.display = 'flex';
  });
  
  document.getElementById('cerrar-formulario').addEventListener('click', () => {
    document.getElementById('formulario-pago').style.display = 'none';
    document.getElementById('form-pago').reset();
  });
  
  document.getElementById('form-pago').addEventListener('submit', (e) => {
    e.preventDefault();
  const formData = new FormData(e.target);

  const edad = parseInt(formData.get('edad'));

  if (edad >= 18) {
  
    fetch('https://formspree.io/f/mvgoegrd', {
      method: 'POST',
      body: formData,
    })
      .then(response => {
        if (response.ok) {
          alert('¡Compra realizada con éxito!');
          document.getElementById('formulario-pago').style.display = 'none'; // Cerrar formulario
        } else {
          alert('Hubo un error al procesar el pago.');
        }
      })
      .catch(error => {
        alert('Error de red: ' + error.message);
      });
    } else {
        alert('Debes ser mayor de 18 años para realizar la compra.');
    }
  }); 

const toggleButton = document.querySelector('.toggle-button');
const productSection = document.querySelector('.product');
productSection.style.display = 'none';
toggleButton.addEventListener('click', () => {
  productSection.classList.toggle('collapsed');

  if (productSection.classList.contains('collapsed')) {
    productSection.style.display = 'none';
    toggleButton.textContent = '+';
  } else {
    productSection.style.display = 'flex';
    toggleButton.textContent = '-';
  }
});

const toggleButton1 = document.querySelector('.btn1');
const productSection1 = document.querySelector('.product1');
productSection1.style.display = 'none';
toggleButton1.addEventListener('click', () => {
  productSection1.classList.toggle('collapsed');

  if (productSection1.classList.contains('collapsed')) {
    productSection1.style.display = 'none';
    toggleButton1.textContent = '+';
  } else {
    productSection1.style.display = 'flex';
    toggleButton1.textContent = '-';
  }
});

const productItems = document.querySelectorAll('.product-item');

productItems.forEach(item => {
  item.addEventListener('click', () => {
    const description = item.querySelector('.description');

    if (description.style.display === 'block') {
      description.style.display = 'none';
    } else {
      description.style.display = 'block';
    }
  });
});