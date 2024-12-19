document.getElementById('form-contacto').addEventListener('submit', (e) => {
    e.preventDefault(); 
  const formData = new FormData(e.target);

    fetch('https://formspree.io/f/mvgoegrd', {
      method: 'POST',
      body: formData,
    })
      .then(response => {
        if (response.ok) {
          alert('¡Envio del mensaje exitosamente!');
          document.getElementById('formulario-contacto').style.display = 'none';
        } else {
          alert('Hubo un error al procesar el mensaje.');
        }
      })
      .catch(error => {
        alert('Error de red: ' + error.message);
      });

      document.getElementById('form-contacto').reset();
  }); 