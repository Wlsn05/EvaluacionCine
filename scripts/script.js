document.querySelectorAll('.silla.disponible').forEach(silla => {
  silla.addEventListener('click', () => {
    const sillaId = silla.getAttribute('data-id');
    fetch('/reservar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sillaId })
    }).then(response => {
      if (response.ok) {
        silla.classList.remove('disponible');
        silla.classList.add('reservada');
      } else {
        alert('Error al reservar la silla');
      }
    });
  });
});