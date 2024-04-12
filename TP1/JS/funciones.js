function ObtenerPersonaje(PersonajeId, outputElementId) {
  fetch(`https://rickandmortyapi.com/api/character/${PersonajeId}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(character) {
      var outputElement = document.getElementById(outputElementId);

      outputElement.innerHTML = `
        <h2>${character.name}</h2>
        <p>Status: ${character.status}</p>
        <p>Species: ${character.species}</p>
        <p>Type: ${character.type || 'N/A'}</p>
        <p>Gender: ${character.gender}</p>
        <p>Location: ${character.location.name}</p>
        <img src="${character.image}" alt="${character.name}" width="200">
      `;
    })
    .catch(function(error) {
      alert('Hubo un error al obtener los datos del personaje');
      console.log(error);
    });
}

function MostrarPersonaje() {
  var PersonajeId = document.getElementById('character').value;

  ObtenerPersonaje(PersonajeId, 'output');

  Promise.all([
    fetch(`https://rickandmortyapi.com/api/character/${PersonajeId}`)])
    .then(function(responses) {
      return Promise.all(responses.map(function(response) {
        return response.json();
      }));
    })
    .catch(function(error) {
      alert('Hubo un error al obtener los datos de los personajes');
      console.log(error);
    });
}
