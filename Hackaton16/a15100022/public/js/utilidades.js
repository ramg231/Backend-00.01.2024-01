// Archivo utilidades.js

// Función para realizar una petición AJAX GET
function getRequest(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        callback(null, xhr.responseText);
      } else {
        callback('Error en la solicitud: ' + xhr.status);
      }
    }
  };
  xhr.send();
}

// Función para realizar una petición AJAX POST
function postRequest(url, data, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 201) {
        callback(null, xhr.responseText);
      } else {
        callback('Error en la solicitud: ' + xhr.status);
      }
    }
  };
  xhr.send(JSON.stringify(data));
}

// Función para mostrar un mensaje de éxito
function mostrarMensajeExito(mensaje) {
  alert('Éxito: ' + mensaje);
}

// Función para mostrar un mensaje de error
function mostrarMensajeError(error) {
  alert('Error: ' + error);
}
