var arraynumeros = [];
function agregarNumeros() {
    let inputNumero = document.getElementById("numInput").value;

    if (inputNumero>=0) {
      arraynumeros.push(inputNumero);
      }
    console.log(arraynumeros); 
    if(arraynumeros.lengt == 10){
        ObetenerPersonaje()}}
   
 function ObtenerPersonaje(arraynumeros){
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
            .then
            fetch(`https://rickandmortyapi.com/api/character/${math.max(arraynumeros)}`)
            .then(response => response.json())
            .then(data => {
                const character = data.results;
                const personajeInfo = {
                    name: character.name,
                    picture: character.image,
                    status: character.status,
                    species: character.species,
                    gender: character.gender
                }
                mostrarDatos(userInfo, personajeInfo);
                })}
        
        function mostrarDatos(userInfo, personajeInfo) {
            if(personajeInfo.species='human'){
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
                    </div>`
            }
            else{
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
            `;
        }}