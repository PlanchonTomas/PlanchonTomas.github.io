fetch("https://rickandmortyapi.com/api/character/3")
	.then(wapo=>wapo.text())
	.then(wapo=>console.log(JSON.parse(wapo)));

//console.log(rickmorty)

////serialización

//const jason = { "var1" : "Pedro", "var2" : "Jorge"};

//const jasonserializado = JSON.stringify(jason)

//console.log(jasonserializado)

////deserialización

//const jasonserializado1 = '{ "var1" : "Pedro", "var2" : "Jorge"}';

//const jason1 = JSON.parse(jasonserializado1)

//console.log(jason1)