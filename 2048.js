/*
TC0 - 2048
Kevin Jiménez Molinares 2021475925
Sebastián López Herrera 2019053591
Josafat Badilla Rodríguez 2020257662
*/

var tabla;
var puntos = 0;
var filas = 4;
var columnas = 4;
var movimientos = 0;
var segundos = 0;
var minutos = 0;
var banderaT = false;
var suma = 0;

// Windows.onload sirve para cerar la funcion apenas cargue la pagina
window.onload = function() {
    IniciarJuego();
    IniciarTiempo();
}

function IniciarJuego() {



    tabla = [[0, 0, 0, 0]
            ,[0, 0, 0, 0]
            ,[0, 0, 0, 0]
            ,[0, 0, 0, 0]]

    // crea los cuadros
    for (let f = 0; f < filas; f++) {
        for (let c = 0; c < columnas; c++) {
            var cuadro = document.createElement("div"); // Crea un div dentro del div
            
            cuadro.id = f.toString() + "-" + c.toString();
            let num = tabla[f][c];
            ActualizarVentana(cuadro, num);
            document.getElementById("tabla").append(cuadro);
        }
    }
    NuevoNumero();
    NuevoNumero();

}

function IniciarTiempo(){
    document.getElementById("Tiempo").innerHTML = minutos + " m " + segundos + " s";
    document.getElementById("Tiempo1").innerHTML = minutos + " m " + segundos + " s";
    document.getElementById("TiempoF").innerHTML = minutos + " m " + segundos + " s";
    if(banderaT == true){
        segundos++;
    }
    if(segundos%60 == 0){
        if(segundos != 0){
            minutos++;
            segundos = 0;
            document.getElementById("Tiempo").innerHTML = minutos + " m " + segundos + " s";
            document.getElementById("Tiempo1").innerHTML = minutos + " m " + segundos + " s";
            document.getElementById("TiempoF").innerHTML = minutos + " m " + segundos + " s";
        }
    }
    setTimeout("IniciarTiempo()", 1000);
}

function ActualizarVentana(cuadro, num) {
    //Actualiza cada cuadro de la tabla
    cuadro.innerText = "";
    cuadro.classList.value = "";
    cuadro.classList.add("ventana");
    if (num > 0) {
        cuadro.innerText = num.toString();
        if (num < 2048) {
            cuadro.classList.add("n"+num.toString());
        } else {
            document.getElementById("resumen").classList.add('show');
            banderaT=false;  
        }
    }
}

document.addEventListener('keyup', (e) => {
    //Lee las teclas presionadas
    if (e.code == "ArrowLeft") {
        banderaT = true;
        if (canMoveRows()){
            Izquierda();
            NuevoNumero();
            movimientos++;
        }
        
        else if (finaliza()){
            banderaT = false;
            document.getElementById("Final").classList.add('show');  
        }
        
        
    }
    else if (e.code == "ArrowRight") {
        banderaT = true;
        if (canMoveRows()){
            Derecha();
            NuevoNumero();
            movimientos++;
        }
        
        else if (finaliza()){
            banderaT = false;
            document.getElementById("Final").classList.add('show');  
        }
        
    }
    else if (e.code == "ArrowUp") {
        banderaT = true;
        if (canMoveColumns()){
            Arriba();
            NuevoNumero();
            movimientos++;
        }
        
        else if (finaliza()){
            banderaT = false;
            document.getElementById("Final").classList.add('show');  
        }
        
    }
    else if (e.code == "ArrowDown") {
        banderaT = true;
        if (canMoveColumns()){
            Abajo();
            NuevoNumero();
            movimientos++;
        }
        
        else if (finaliza()){
            banderaT = false;
            document.getElementById("Final").classList.add('show');  
        }
        
    }

    document.getElementById("puntos").innerText = puntos;
    document.getElementById("movimientos").innerText = movimientos;
    document.getElementById("puntosF").innerText = puntos;
    document.getElementById("movimientosF").innerText = movimientos;
})

function filtro(fila){
    // Crea un nuevo arreglo con todos los números sin los números 0
    return fila.filter(num => num != 0);
}

function mover(fila) {
    // Mueve los elementos dentro de cada fila o columna , valida si son iguales y suma el valor de estos
    fila = filtro(fila);
    for (let i = 0; i < fila.length-1; i++){
        if (fila[i] == fila[i+1]) {
            fila[i] *= 2;
            fila[i+1] = 0;
            puntos += fila[i];
        }
    }
    fila = filtro(fila);

    while (fila.length < columnas) { // rellena la fila con 0 si quedan espacios libres
        fila.push(0);
    }

    return fila;
}

function Izquierda() {
    //Mueve los elementos de las filas hacia la izquiera
    for (let f = 0; f < filas; f++) {
        let fila = tabla[f];
        fila = mover(fila);
        tabla[f] = fila;
        for (let c = 0; c < columnas; c++){
            let cuadro = document.getElementById(f.toString() + "-" + c.toString());
            let num = tabla[f][c];
            ActualizarVentana(cuadro, num);
        }
    }
}

function Derecha() {
    //Mueve los elementos de las filas hacia la derecha
    for (let f = 0; f < filas; f++) {
        let fila = tabla[f];        
        fila.reverse(); //le da vuelta a la fila para usar la misma función de mover              
        fila = mover(fila)           
        tabla[f] = fila.reverse();   
        for (let c = 0; c < columnas; c++){
            let cuadro = document.getElementById(f.toString() + "-" + c.toString());
            let num = tabla[f][c];
            ActualizarVentana(cuadro, num); //actualiza el estado del cuadro necesario
        }
    }
}

function Arriba() {
    //Mueve los elementos de las columnas hacia arriba
    for (let c = 0; c < columnas; c++) {
        let fila = [tabla[0][c], tabla[1][c], tabla[2][c], tabla[3][c]]; //organiza los elementos de una columna como una fila
        fila = mover(fila);
        for (let f = 0; f < filas; f++){
            tabla[f][c] = fila[f];
            let cuadro = document.getElementById(f.toString() + "-" + c.toString());
            let num = tabla[f][c];
            ActualizarVentana(cuadro, num);
        }
    }
}

function Abajo() {
    //Mueve los elementos de las columnas hacia abajo
    for (let c = 0; c < columnas; c++) {
        let fila = [tabla[0][c], tabla[1][c], tabla[2][c], tabla[3][c]]; //organiza los elementos de las columna como una fila
        fila.reverse(); // le da vuelta a la fila
        fila = mover(fila); 
        fila.reverse(); 
        for (let f = 0; f < filas; f++){
            tabla[f][c] = fila[f];
            let cuadro = document.getElementById(f.toString() + "-" + c.toString());
            let num = tabla[f][c];
            ActualizarVentana(cuadro, num);
        }
    }
}

function NuevoNumero() {
    //Crea un nuevo número en el tablero, escoge de manera aleatortia entre 2 o 4
    if (!Vacio()) {
        return;
    }
    let bandera = false;
    while (!bandera) {
        //crea dos numeros 2 en posiciones random
        let f = Math.floor(Math.random() * filas);
        let c = Math.floor(Math.random() * columnas);
        if (tabla[f][c] == 0) {
            let num = Math.random() < 0.6 ? 2 : 4;
            tabla[f][c] = num;
            suma += num;
            document.getElementById("Suma").innerHTML = suma;
            document.getElementById("SumaF").innerHTML = suma;
            let cuadro = document.getElementById(f.toString() + "-" + c.toString());
            cuadro.innerText = num,toString();
            cuadro.classList.add("n" + num.toString());
            bandera = true;
        }
    }
    
}

function finaliza(){
    // Finaliza cuando no esté vacio ni haya movimientos disponibles
    return(!(Vacio() || canMoveColumns() || canMoveRows())); 


}

function canMoveRows(){
    if (Vacio()){ //si hay algun espacio vacio 
        return true;
    }

    else{ 
        for (let f = 0; f < filas; f++) { 
            for (let c = 0; c < columnas - 1; c++) {
                if (tabla[f][c] == tabla[f][c+1]) { 
                    return true; // verificar que pueda haber movimiento en la fila
                }
            }
        }

        return false; 
    }
    

}

function canMoveColumns(){
    if (Vacio()){       
        return true;
    }

    else{
        for (let f = 0; f < filas - 1; f++) {
            for (let c = 0; c < columnas; c++) {
                if (tabla[f][c] == tabla[f+1][c]) { 
                    return true; // verificar que pueda haber movimiento en la columna
                }
            }
        }

        return false;} 
}

function Vacio() {
    let cont = 0;
    for (let f = 0; f < filas; f++) {
        for (let c = 0; c < columnas; c++) {
            if (tabla[f][c] == 0) {
                return true;
            }
        }
    }
    return false;
    
}

document.getElementById('restartBtn').addEventListener('click', _ => {
    location.reload();
})

let refresh2 = document.getElementById('reiniciar');
refresh2.addEventListener('click', _ => {
    location.reload();
})

let refresh3 = document.getElementById('Final');
refresh3.addEventListener('click', _ => {
    location.reload();
})

document.getElementById("resumeBtn").addEventListener('click', function() {
    banderaT = false;
    document.getElementById("resumen").classList.add('show');  
  });
  
document.getElementById("close").addEventListener('click', function(e) {
    e.preventDefault();
    banderaT = true; 
    document.getElementById("resumen").classList.remove('show');
  });


  