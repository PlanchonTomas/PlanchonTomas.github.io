function consultar() {
    // Obtener usuario aleatorio
    fetch('https://randomuser.me/api/')
        .then(response => response.json())
        .then(data => mostrarUsuario(data.results[0]));

    // Obtener personaje de Rick and Morty
    fetch('https://rickandmortyapi.com/api/character/')
        .then(response => response.json())
        .then(data => mostrarRickAndMorty(data.results[0]));
}

function mostrarUsuario(usuario) {
    document.getElementById('usuarioFoto').src = usuario.picture.large;
    document.getElementById('usuarioNombre').textContent = usuario.name.first;
    document.getElementById('usuarioApellido').textContent = usuario.name.last;
    document.getElementById('usuarioFechaNacimiento').textContent = usuario.dob.date;
    document.getElementById('usuarioLocalidad').textContent = usuario.location.city;
    document.getElementById('usuarioLatitud').textContent = usuario.location.coordinates.latitude;
    document.getElementById('usuarioLongitud').textContent = usuario.location.coordinates.longitude;

    // Ubicar coordenadas en el mapa
    mostrarMapa(usuario.location.coordinates.latitude, usuario.location.coordinates.longitude);
}

function mostrarRickAndMorty(personaje) {
    document.getElementById('rickAndMortyFoto').src = personaje.image;
    document.getElementById('rickAndMortyNombre').textContent = personaje.name;
    document.getElementById('rickAndMortyStatus').textContent = personaje.status;
    document.getElementById('rickAndMortyEspecie').textContent = personaje.species;
    document.getElementById('rickAndMortyGenero').textContent = personaje.gender;
    document.getElementById('rickAndMortyLocalizacion').textContent = personaje.location.name;
}

function mostrarMapa(latitud, longitud) {
    const mapaDiv = document.getElementById('mapa');
    mapaDiv.innerHTML = '<iframe width="400" height="300" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.openstreetmap.org/export/embed.html?bbox=' + longitud + '%2C' + latitud + '&amp;layer=mapnik&amp;marker=' + latitud + '%2C' + longitud + '"></iframe>';
}

