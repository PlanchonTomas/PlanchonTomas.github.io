    // Obtener el botón y el campo de entrada
    var boton = document.getElementById("consultar");
    var inputId = document.getElementById("id");

    // Agregar un evento de clic al botón
    boton.addEventListener("click", function() {
      // Obtener el valor de la ID ingresada
      var id = inputId.value;

      // Construir la URL de la API
      var url = "https://rickandmortyapi.com/api/character/" + id;

      // Realizar una petición a la API utilizando fetch
      fetch(url)
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          // Mostrar los datos del personaje en la página
          var resultado = document.getElementById("resultado");
          resultado.innerHTML = `
            <h2>${data.name}</h2>
            <p>Especie: ${data.species}</p>
            <p>Estado: ${data.status}</p>
            <p>Ultima ubicacion conocida: ${data.location.name}</p>
            <img src="${data.image}" alt="${data.name}">
          `;
        })
        .catch(function(error) {
          console.log(error);
        });
    });