function getCharacterInfo(characterId, outputElementId) {
  fetch(`https://rickandmortyapi.com/api/character/${characterId}`)
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

function compareEpisodes(character1, character2) {
  if (character1.episode.length > character2.episode.length) {
    return character1.name + ' ha aparecido en mas episodios.';
  } else if (character1.episode.length < character2.episode.length) {
    return character2.name + ' ha aparecido en mas episodios.';
  } else {
    return 'Ambos personajes han aparecido en la misma cantidad de episodios.';
  }
}

function showCharacterInfo() {
  var characterId1 = document.getElementById('character1').value;
  var characterId2 = document.getElementById('character2').value;

  getCharacterInfo(characterId1, 'output1');
  getCharacterInfo(characterId2, 'output2');

  Promise.all([
    fetch(`https://rickandmortyapi.com/api/character/${characterId1}`),
    fetch(`https://rickandmortyapi.com/api/character/${characterId2}`)
  ])
    .then(function(responses) {
      return Promise.all(responses.map(function(response) {
        return response.json();
      }));
    })
    .then(function(characters) {
      var comparisonResult = compareEpisodes(characters[0], characters[1]);
      document.getElementById('comparison').innerHTML = comparisonResult;
    })
    .catch(function(error) {
      alert('Hubo un error al obtener los datos de los personajes');
      console.log(error);
    });
}
