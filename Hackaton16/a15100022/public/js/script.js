// Archivo script.js

// JavaScript para funcionalidades adicionales en la página
// Por ejemplo, puedes agregar interactividad con eventos de clic, validación de formularios, etc.

// Función para validar el formulario de registro
function validarRegistro() {
  var nombre = document.getElementById('nombre').value;
  var email = document.getElementById('email').value;
  var contraseña = document.getElementById('contraseña').value;

  // Verificar si los campos están vacíos
  if (nombre.trim() === '' || email.trim() === '' || contraseña.trim() === '') {
    alert('Por favor completa todos los campos');
    return false;
  }

  // Verificar si la contraseña tiene al menos 6 caracteres
  if (contraseña.length < 6) {
    alert('La contraseña debe tener al menos 6 caracteres');
    return false;
  }

  // Si todo está bien, enviar el formulario
  return true;
}

// Agregar evento de clic al botón de registro
document.getElementById('btnRegistro').addEventListener('click', function(event) {
  // Prevenir el envío del formulario si la validación no pasa
  if (!validarRegistro()) {
    event.preventDefault();
  }
});
