document.getElementById('reseña-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const reseña = document.getElementById('reseña').value.trim();

    if (!nombre || !reseña) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    const reseñaDiv = document.createElement('div');
    reseñaDiv.classList.add('reseña-item');

    reseñaDiv.innerHTML = `
        <h3>${nombre}</h3>
        <p>${reseña}</p>
    `;

    const reseñasContainer = document.getElementById('reseñas-container');
    reseñasContainer.prepend(reseñaDiv);

    document.getElementById('reseña-form').reset();
});
