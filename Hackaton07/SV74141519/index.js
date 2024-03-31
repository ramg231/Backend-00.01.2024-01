document.getElementById('buscar').addEventListener('click', function() {
  const username = document.getElementById('username').value;
  fetch(`/buscar?username=${encodeURIComponent(username)}`)
      .then(response => response.json())
      .then(data => {
          document.getElementById('resultado').textContent = JSON.stringify(data, null, 2);
      })
      .catch(error => console.error('Error:', error));
});