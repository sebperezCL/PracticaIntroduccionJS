/* eslint-disable no-unused-vars */
"use strict"

function covierteNumero(valor){
    if(valor < 1 || valor > 3999){
        return 'Valor fuera de rango'
    }
    let resultado = []
    let sValor = valor.toString()
    console.log(sValor)
    
    /*Array en dos dimensiones con las equivalencias entre cifras arábicas y números romanos
    Nota: No encontré una solución más elegante :S */
    let tabla = [['','M','MM','MMM'],['','C','CC','CCC','CD','D','DC','DCC','DCCC','CM'],['','X','XX','XXX','XL','L','LX','LXX','LXXX','XC'],
    ['','I','II','III','IV','V','VI','VII','VIII','IX']]

    //Con este ciclo recorremos el número entregado cifra por cifra, buscando en el array el equivalente en romano
    for(let i=0, largo=sValor.length; i < largo; i++){
        console.log(sValor.charAt(i))
        //Nota: Esto sólo funcionará para el rango indicado en el ejercicio (número de 4 cifras)
        resultado[i] = tabla[4-(largo-i)][parseInt(sValor.charAt(i))]
    }
    console.log(resultado)
    return resultado
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