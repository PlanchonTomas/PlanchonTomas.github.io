////HACER UN FETCH
//fetch("https://rickandmortyapi.com/api/character/140")
//	.then(wapo=>wapo.text())
//	.then(wapo=>console.log(JSON.parse(wapo)));

////CREAR UNA ARRAY
let frutas = ["Manzana", "Banana", "pera"];

frutas.forEach(function (elemento, indice, array) {
  console.log(elemento, indice);});

////MOSTRAR EN CONSOLA UN ELEMENTO ESPECIFICO DE LA ARRAY 
//let first = frutas[0];
//let second = frutas[1];
//let third = frutas[2];

//console.log(first, second, third)

////MOSTRAR EN CONSOLA ELEMENTOS DE LA ARRAY SIN LA ID
//frutas.forEach(fruta=>{console.log(fruta)})

//console.log(rickmorty)

////SERIALIZACION

//const jason = { "var1" : "Pedro", "var2" : "Jorge"};

//const jasonserializado = JSON.stringify(jason)

//console.log(jasonserializado)

////DESERIALIZACION

//const jasonserializado1 = '{ "var1" : "Pedro", "var2" : "Jorge"}';

//const jason1 = JSON.parse(jasonserializado1)

//console.log(jason1)