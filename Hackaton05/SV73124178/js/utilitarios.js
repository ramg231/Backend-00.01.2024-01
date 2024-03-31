const guardarLocalStorage = (llave,valor) => {
    localStorage.setItem(llave, JSON.stringify(valor));
}

const obtenerValorLocalStorage = (llave) => {
    return JSON.parse(localStorage.getItem(llave));
}

const limpiarTodoLocalStorage = () => {
    localStorage.clear()
}

export { guardarLocalStorage, obtenerValorLocalStorage, limpiarTodoLocalStorage }