/* eslint-disable no-unused-vars */
"use strict"

function covierteNumero(valor){
    if(valor < 1 || valor > 3999){
        return 'Valor fuera de rango'
    }
    let resultado = []
    let sValor = valor.toString()
    
    /*Array en dos dimensiones con las equivalencias entre cifras arábicas y números romanos
    Nota: No encontré una solución más elegante :S */
    let tabla = [['','M','MM','MMM'],['','C','CC','CCC','CD','D','DC','DCC','DCCC','CM'],['','X','XX','XXX','XL','L','LX','LXX','LXXX','XC'],
    ['','I','II','III','IV','V','VI','VII','VIII','IX']]
    
    //Con este ciclo recorremos el número entregado cifra por cifra, buscando en el array el equivalente en romano
    for(let i=0, largo=sValor.length; i < largo; i++){
        //Nota: Esto sólo funcionará para el rango indicado en el ejercicio (número de 4 cifras)
        resultado[i] = tabla[4-(largo-i)][parseInt(sValor.charAt(i))]
    }
    return resultado.join('')
}

function convierteRomano(valor){
    let resultado = 0
    let pos, posMas1, posMas2, posMas3
    for(let i=0, largo=valor.length; i < largo; i++){       
        pos = validarRomano(valor[i])        
        if(pos){
            if(i+1 >= largo){
                resultado += pos.numero
            }else{
                posMas1 = validarRomano(valor[i+1])
                if(pos.romano == 'V' || pos.romano == 'L' || pos.romano == 'D'){
                    if(pos.numero <= posMas1.numero){
                        return 'No es romano'                        
                    }else{ resultado += pos.numero }
                }else{
                    if(pos.numero >= posMas1.numero){
                        resultado += pos.numero
                    }else {
                        resultado += (posMas1.numero - pos.numero)
                        i++
                    }
                }
            }
            //console.log(`Encontrado el valor: ${pos.numero}`)
        }else{
            return 'No es romano'          
        }
    }
    return resultado
}

function validarRomano(valor){
    let tabla = [
        {numero: 1, romano: 'I'},
        {numero: 5, romano: 'V'},
        {numero: 10, romano: 'X'},
        {numero: 50, romano: 'L'},
        {numero: 100, romano: 'C'},
        {numero: 500, romano: 'D'},
        {numero: 1000, romano: 'M'},
    ]
    return tabla.find(item => {return item.romano == valor })
}

//Comienzo la lectura del archivo input.txt, donde vienen todos los valores a convertir
const fs = require('fs')

//Leo la información y la transformo en un array con los valores de cada línea
const data = fs.readFileSync('input.txt', 'utf-8').split('\r\n')
let resultado = []

for (let i = 0; i < data.length; i++) {
    if(parseInt(data[i])){
        resultado[i] = [data[i],covierteNumero(data[i])]
    } else{
        resultado[i] = [data[i],convierteRomano(data[i])]
    }
  }  

console.table(resultado)