/* eslint-disable no-unused-vars */
"use strict"

function covierteNumero(valor){
    if(valor < 1 || valor > 3999){
        return 'Número fuera de rango'
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
    /*Esta variable: numeroMenor se usa para controlar que no aparezcan valores como D, C o M al final de la cadena, 
    en general algún numero mayor a los ya evaluados. Permite filtrar valores como MIXX o XCD*/
    let numeroMenor = 1000
    let pos, posMas1
    for(let i=0, largo=valor.length; i < largo; i++){       
        pos = validarRomano(valor[i])        
        if(pos){
            //
            if(pos.numero > numeroMenor) {return 'No es romano válido - numero menor'}
            if(i+1 >= largo){
                numeroMenor = pos.numero
                resultado += pos.numero
            }else{
                posMas1 = validarRomano(valor[i+1])                
                if(pos.romano == 'V' || pos.romano == 'L' || pos.romano == 'D'){
                    if(valor.split(valor[i]).length > 2){
                        return 'No es romano - con split'
                    }
                    if(pos.numero <= posMas1.numero){
                        return 'No es romano'                        
                    }else{ 
                        numeroMenor = pos.numero
                        resultado += pos.numero 
                    }
                }else{
                    if(valor.split(valor[i]).length > 4){
                        return 'No es romano - con split'
                    }
                    if(pos.numero >= posMas1.numero){
                        numeroMenor = pos.numero
                        resultado += pos.numero
                    }else {
                        if(pos.romano == 'I'){
                            if(posMas1.romano == 'L' || posMas1.romano == 'C' || posMas1.romano == 'D' || posMas1.romano == 'M'){
                                return 'No es romano - valida I'
                            }
                        }
                        if(pos.romano == 'X'){
                            if(posMas1.romano == 'D' || posMas1.romano == 'M'){
                                return 'No es romano - valida X'
                            }
                        }
                        numeroMenor = posMas1.numero - pos.numero
                        resultado += numeroMenor
                        i++
                    }
                }
            }
        }else{            
            return 'No es romano'          
        }
    }
    return resultado
}

//Esta función busca el valor entregado en un array que sólo contiene los caracteres romanos válidos
//retorna undefined si el valor no corresponde a un número romano
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
        //Si es número entonces convierte número en romano
        resultado[i] = [data[i],covierteNumero(data[i])]
    } else{
        //Si no es número entonces envía la cadena en mayúsculas para validar y convertir en número si corresponde
        resultado[i] = [data[i],convierteRomano(data[i].toUpperCase())]
    }
  }  

console.table(resultado)