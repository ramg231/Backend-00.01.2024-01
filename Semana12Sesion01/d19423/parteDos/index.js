function fetchData(callback) {
    // Simulación de una solicitud AJAX 
    setTimeout(function () {
        const data = { message: "¡Hola, mundo!" };
        callback(data);
    }, 5000);
}
console.log("Inicio")
fetchData(function (data) {
    console.log(data.message);
});
console.log("Fin")



function fetchData2() {
    return new Promise(function (resolve, reject) {
        // Simulación de una solicitud AJAX 
        setTimeout(function () {
            const data = { message: "¡Hola, mundo!" };
            resolve(data);
            // Resolución exitosa // Si hubiera un error, se usaría reject(error) 
        }, 1000);
    });
}

console.log("Inicio Promesa")
fetchData2()
    .then(function (data) {
        console.log("LLego data de la promesa")
        console.log(data.message);
    })
    .catch(function (error) {
        console.error("Error:", error);
    });
console.log("Fin Promesa")


async function fetchData3() {
    try {
        const response = await fetch('https://randomuser.me/api/');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}


fetchData3().then(datos => console.log(datos)).catch(error => console.error(error));