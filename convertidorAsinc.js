/*EJERCICIO DE PRÁCTICA CON LECTURA ASÍNCRONA
Los valores se leen del archivo input.txt donde deben venir n valores, 1 por cada línea del archivo*/

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
    //Recorremos el array para evaluar el string recibido
    for(let i=0, largo=valor.length; i < largo; i++){       
        pos = validarRomano(valor[i])        
        if(pos){            
            //Si la función validarRomano entrega un objeto válido entonces se evalúa, en caso contrario retorna error
            if(pos.numero > numeroMenor) {return `No es romano válido aparece ${pos.romano} después de haber evaluado ${numeroMenor}`}
            
            if(i+1 >= largo){
                //Si no hay más cifras en la posición siguiente entonces suma el número
                numeroMenor = pos.numero
                resultado += pos.numero
            }else{
                //En caso contrario (si hay más cifras en la posición siguiente) entonces evalúa el número que viene a continuación
                posMas1 = validarRomano(valor[i+1])                
                if(pos.romano == 'V' || pos.romano == 'L' || pos.romano == 'D'){
                    //Si es uno de los caracteres anteriores entonces aplica las reglas de validación
                    if(valor.split(valor[i]).length > 2){
                        return `No es romano válido aparece ${pos.romano} repetido`
                    }
                    if(pos.numero <= posMas1.numero){
                        return `No es romano válido aparece ${pos.romano} a la izquierda de ${posMas1.romano}`        
                    }else{ 
                        numeroMenor = pos.numero
                        resultado += pos.numero 
                    }
                }else{
                    //Si es una I, X, C o M entonces aplica las reglas de validación correspondientes
                    if(valor.split(valor[i]).length > 4){
                        return `No es romano válido aparece ${pos.romano} más de 3 veces`
                    }
                    if(pos.numero >= posMas1.numero){
                        numeroMenor = pos.numero
                        resultado += pos.numero
                    }else {
                        if(pos.romano == 'I'){
                            if(posMas1.romano == 'L' || posMas1.romano == 'C' || posMas1.romano == 'D' || posMas1.romano == 'M'){
                                return `No es romano válido aparece ${pos.romano} a la izquierda de ${posMas1.romano}`
                            }
                        }
                        if(pos.romano == 'X'){
                            if(posMas1.romano == 'D' || posMas1.romano == 'M'){
                                return `No es romano válido aparece ${pos.romano} a la izquierda de ${posMas1.romano}`
                            }
                        }
                        if(numeroMenor == pos.numero && posMas1.numero > pos.numero) {return 'No es un número romano válido'}
                        numeroMenor = posMas1.numero - pos.numero
                        resultado += numeroMenor
                        i++
                    }
                }
            }
        }else{            
            return 'No es romano, contiene caracteres inválidos'
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

//Función llamada en el callback del proceso asíncrono
function proceso(data){
    let resultado = []
    let strResultado, conversion
    strResultado = ''
    data = data.split('\r\n')
    for (let i = 0; i < data.length; i++) {
        if(parseInt(data[i])){
            //Si es número entonces convierte número en romano
            conversion = covierteNumero(data[i])
            resultado[i] = [data[i],conversion]
            strResultado += conversion + '\n'
        } else{
            //Si no es número entonces envía la cadena en mayúsculas para validar y convertir en número si corresponde
            conversion = convierteRomano(data[i].toUpperCase())
            resultado[i] = [data[i],conversion]
            strResultado += conversion + '\n'
        }
    }  
    console.table(resultado)

    //Se escribe en el archivo output.txt el resultado de las evaluaciones
    fs.writeFile("output.txt", strResultado,(error) => {
            if (error) throw error
            console.log('El archivo se ha grabado')})

    return strResultado
}

const fs = require('fs')
const { setImmediate } = require('timers')

console.log('Leyendo archivo asíncrono')
let strResultado

//Comienzo la lectura del archivo input.txt, donde vienen todos los valores a convertir (un valor por cada línea)
fs.readFile('input.txt', 'utf-8', (error, datos) => {
    strResultado = proceso(datos)
    if (error) throw error    
  })