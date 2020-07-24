"use strict"

function covierteNumero(valor){
    //console.log(`El valor ${valor} es número`)
    if(valor < 1 || valor > 3999){
        return 'Valor fuera de rango'
    }
    let divisor = 1000
    do {
        console.log(parseInt(valor/divisor)) //(valor - valor%divisor)/divisor)
        valor = valor%divisor
        divisor /= 10        
    } while (valor%divisor > 1)
    console.log(valor%divisor)
}

function convierteRomano(valor){
    //console.log(`El valor ${valor} es string`)
}


//Comienzo la lectura del archivo input.txt, donde vienen todos los valores a convertir
const fs = require('fs')

//Leo la información y la transformo en un array con los valores de cada línea
const data = fs.readFileSync('input.txt', 'utf-8').split('\r\n')
let resultado = []

for (let i = 0; i < data.length; i++) {
    if(parseInt(data[i])){
        resultado[i] = covierteNumero(data[i])    
    } else{
        resultado[i] = convierteRomano(data[i])
    }
  }  

console.log(resultado)