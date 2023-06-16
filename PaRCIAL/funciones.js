function buscarDatosProvincia(provinciaID, outputElementId) {
    fetch(`localhost/dashboard/PaRCIALAPI.json/${provinciaID}`)
      .then(function(response) {
        return response.json();
      })
      .then(function(provincia) {
        var outputElement = document.getElementById(outputElementId);
  
        outputElement.innerHTML = `
          <h2>Provincia: ${provincia.nombre}</h2>
          <p>Latitud: ${provincia.lat}</p>
          <p>Longitud: ${provincia.lon}</p>
        `;
      })
  }

  function buscarDatosMunicipio(municipioID, outputElementId) {
    fetch(`localhost/dashboard/PaRCIALAPI.json/${municipioID}`)
      .then(function(response) {
        return response.json();
      })
      .then(function(municipio) {
        var outputElement = document.getElementById(outputElementId);
  
        outputElement.innerHTML = `
          <h2>Municipio: ${municipio.nombre}</h2>
        `;
      })
  }

  function mostrarLocalidades(provinciaID, municipioID) {
    var provinciaID = document.getElementById('provincia');
    var municipioID = document.getElementById('municipio');
  
    buscarDatosProvincia(provinciaID, 'output1');
    buscarDatosMunicipio(municipioID, 'output2');
  
    Promise.all([
      fetch(`localhost/dashboard/PaRCIALAPI.json/${provinciaID}`),
      fetch(`localhost/dashboard/PaRCIALAPI.json/${municipioID}`)
    ])
      .then(function(responses) {
        return Promise.all(responses.map(function(response) {
          return response.json();
        }));
      })
  }
  
