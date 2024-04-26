document.getElementById('consultar').addEventListener('click', consultar);

function consultar() {
    fetch('https://randomuser.me/api/')
        .then(response => response.json())
        .then(data => {
            const user = data.results[0];
            const userInfo = {
                name: `${user.name.first} ${user.name.last}`,
                age: user.dob.age,
                location: `${user.location.city}, ${user.location.country}`,
                latitude: user.location.coordinates.latitude,
                longitude: user.location.coordinates.longitude,
                picture: user.picture.large,
                gender: user.gender
            };
            return userInfo;
        })
        .then(userInfo => {
            fetch('https://rickandmortyapi.com/api/character/')
                .then(response => response.json())
                .then(data => {
                    const character = data.results[Math.floor(Math.random() * data.results.length)];
                    const personajeInfo = {
                        name: character.name,
                        picture: character.image,
                        status: character.status,
                        species: character.species,
                        gender: character.gender
                    };
                    mostrarDatos(userInfo, personajeInfo);
                });
        })
        .catch(error => console.error('Error al conseguir los datos:', error));
}

function mostrarDatos(userInfo, personajeInfo) {
    const dataContainer = document.getElementById('dataContainer');
    dataContainer.innerHTML = `
        <h2>Usuario Aleatorio:</h2>
        <div>
            <img src="${userInfo.picture}" alt="User Picture">
            <p>Nombre: ${userInfo.name}</p>
            <p>Edad: ${userInfo.age}</p>
            <p>Ubicación: ${userInfo.location}</p>
            <p>Genero: ${userInfo.gender}</p>
        </div>
        <h2>Personaje de Rick and Morty:</h2>
        <div>
            <img src="${personajeInfo.picture}" alt="personaje Picture">
            <p>Nombre: ${personajeInfo.name}</p>
            <p>Estado: ${personajeInfo.status}</p>
            <p>Especie: ${personajeInfo.species}</p>
            <p>Genero: ${personajeInfo.gender}</p>
        </div>
    `;

    const map = L.map('map').setView([userInfo.latitude, userInfo.longitude], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    L.marker([userInfo.latitude, userInfo.longitude]).addTo(map)
        .bindPopup('User Location')
        .openPopup();
}

