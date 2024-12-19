const productosContainerApi = document.getElementById('productos');

async function cargarProductosApi() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const productos = await response.json();

        productos.forEach(producto => {
            const productoCardApi = document.createElement('div');
            productoCardApi.classList.add('producto-card');

            productoCardApi.innerHTML = `
        <img src="${producto.image}" alt="${producto.title}" class="producto-img">
        <h3>${producto.title}</h3>
        <p>${producto.description.substring(0, 100)}...</p>
        <span class="producto-precio">$${producto.price}</span>
        <button class="btn-agregar" data-id="${producto.id}">Añadir al Carrito</button>
      `;

            productosContainerApi.appendChild(productoCardApi);
        });
    } catch (error) {
        console.error("Error al cargar productos:", error);
    }
}

cargarProductosApi();

let carritoApi = JSON.parse(localStorage.getItem("carritoApi")) || [];

const modalCarritoApi = document.getElementById("modal-carrito");
const listaCarritoApi = document.getElementById("lista-carrito");
const totalCarritoApi = document.getElementById("total-carrito");
const cerrarCarritoApi = document.getElementById("cerrar-carrito");

function actualizarCarritoApi() {
    listaCarritoApi.innerHTML = "";
    let total = 0;

    carritoApi.forEach((producto, index) => {
        total += producto.price * producto.cantidad;
        const itemApi = document.createElement("li");
        itemApi.innerHTML = `
      <div style="margin: 20px; width: 45%;"> ${producto.title}</div><div style="margin: 20px; width: 25%;">$${producto.price.toFixed(2)} x ${producto.cantidad}</div> 
      <div class="div-pro"><button class="btn-eliminar" data-index="${index}">x</button>
      <button class="btn-cantidad btn-menos" data-index="${index}">-</button>
      <span class="cantidad">${producto.cantidad}</span>
      <button class="btn-cantidad btn-mas" data-index="${index}">+</button></div>
    `;
        listaCarritoApi.appendChild(itemApi);
    });

    totalCarritoApi.textContent = `$${total.toFixed(2)}`;
}

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-agregar")) {
        const id = e.target.dataset.id;
        const producto = carritoApi.find((prod) => prod.id === id);

        if (producto) {
            producto.cantidad++;
        } else {
            const cardApi = e.target.closest(".producto-card");
            carritoApi.push({
                id,
                title: cardApi.querySelector("h3").textContent,
                price: parseFloat(cardApi.querySelector(".producto-precio").textContent.replace("$", "")),
                cantidad: 1,
            });
        }

        localStorage.setItem("carritoApi", JSON.stringify(carritoApi));
        actualizarCarritoApi();
    }
});

listaCarritoApi.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-eliminar")) {
        const index = e.target.dataset.index;
        carritoApi.splice(index, 1);
        localStorage.setItem("carritoApi", JSON.stringify(carritoApi));
        actualizarCarritoApi();
    }

    if (e.target.classList.contains("btn-menos")) {
        const index = e.target.dataset.index;
        if (carritoApi[index].cantidad > 1) {
            carritoApi[index].cantidad--;
        } else {
            carritoApi.splice(index, 1);
        }
        localStorage.setItem("carritoApi", JSON.stringify(carritoApi));
        actualizarCarritoApi();
    }

    if (e.target.classList.contains("btn-mas")) {
        const index = e.target.dataset.index;
        carritoApi[index].cantidad++;
        localStorage.setItem("carritoApi", JSON.stringify(carritoApi));
        actualizarCarritoApi();
    }
});

document.getElementById("carrito-btn-api").addEventListener("click", () => {
    modalCarritoApi.style.display = "block";
    actualizarCarritoApi();
});

cerrarCarritoApi.addEventListener("click", () => {
    modalCarritoApi.style.display = "none";
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