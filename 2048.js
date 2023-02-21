var tabla;
var puntos = 0;
var filas = 4;
var columnas = 4;
var movimientos = 0;
var suma = 0;

// Windows.onload sirve para cerar la funcion apenas cargue la pagina
window.onload = function() {
    IniciarJuego();
}

function IniciarJuego() {

    tabla = [[0, 0, 0, 0]
            ,[0, 0, 0, 0]
            ,[0, 0, 0, 0]
            ,[0, 0, 0, 0]]

    // crea los cuadros
    for (let f = 0; f < filas; f++) {
        for (let c = 0; c < columnas; c++) {
            let cuadro = document.createElement("div"); // Crea un div dentro del div
            
            cuadro.id = f.toString() + "-" + c.toString();
            let num = tabla[f][c];
            ActualizarVentana(cuadro, num);
            document.getElementById("tabla").append(cuadro);
        }
    }
    CreaDos();
    CreaDos();

}

function ActualizarVentana(cuadro, num) {
    cuadro.innerText = "";
    cuadro.classList.value = "";
    cuadro.classList.add("ventana");
    if (num > 0) {
        cuadro.innerText = num.toString();
        if (num <= 2048) {
            cuadro.classList.add("n"+num.toString());
        } else {
            cuadro.classList.add("n8192");
        }
    }
}

document.addEventListener('keyup', (e) => {
    if (e.code == "ArrowLeft") {
        if (finaliza()){
            alert("No hay más movimientos disponiles")
        }
        Izquierda();
        CreaDos();
        
    }
    else if (e.code == "ArrowRight") {
        if (finaliza()){
            alert("No hay más movimientos disponiles")
        }
        Derecha();
        CreaDos();
        
    }
    else if (e.code == "ArrowUp") {
        if (finaliza()){
            alert("No hay más movimientos disponiles")
        }
        Arriba();
        CreaDos();
        
    }
    else if (e.code == "ArrowDown") {
        if (finaliza()){
            alert("No hay más movimientos disponiles")
        }
        Abajo();
        CreaDos();
        
    }

    document.getElementById("puntos").innerText = puntos;
    document.getElementById("movimientos").innerText = movimientos;
})

function filtro(fila){
    return fila.filter(num => num != 0); //create new array of all nums != 0
}

function mover(fila) {
    //[0, 2, 2, 2]
    fila = filtro(fila); //[2, 2, 2]
    for (let i = 0; i < fila.length-1; i++){
        if (fila[i] == fila[i+1]) {
            fila[i] *= 2;
            fila[i+1] = 0;
            puntos += fila[i];
        }
    } //[4, 0, 2]
    fila = filtro(fila); //[4, 2]

    while (fila.length < columnas) {
        fila.push(0);
    } //[4, 2, 0, 0]

    //movimientos++;
    
    return fila;
}

function Izquierda() {
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
    for (let f = 0; f < filas; f++) {
        let fila = tabla[f];         //[0, 2, 2, 2]
        fila.reverse();              //[2, 2, 2, 0]
        fila = mover(fila)            //[4, 2, 0, 0]
        tabla[f] = fila.reverse();   //[0, 0, 2, 4];
        for (let c = 0; c < columnas; c++){
            let cuadro = document.getElementById(f.toString() + "-" + c.toString());
            let num = tabla[f][c];
            ActualizarVentana(cuadro, num);
        }
    }
}

function Arriba() {
    for (let c = 0; c < columnas; c++) {
        let fila = [tabla[0][c], tabla[1][c], tabla[2][c], tabla[3][c]];
        fila = mover(fila);
        // tabla[0][c] = fila[0];
        // tabla[1][c] = fila[1];
        // tabla[2][c] = fila[2];
        // tabla[3][c] = fila[3];
        for (let f = 0; f < filas; f++){
            tabla[f][c] = fila[f];
            let cuadro = document.getElementById(f.toString() + "-" + c.toString());
            let num = tabla[f][c];
            ActualizarVentana(cuadro, num);
        }
    }
}

function Abajo() {
    for (let c = 0; c < columnas; c++) {
        let fila = [tabla[0][c], tabla[1][c], tabla[2][c], tabla[3][c]];
        fila.reverse(); // le da vuelta a la fila
        fila = mover(fila);
        fila.reverse(); // le da vuelta a la fila
        // tabla[0][c] = fila[0];
        // tabla[1][c] = fila[1];
        // tabla[2][c] = fila[2];
        // tabla[3][c] = fila[3];
        for (let f = 0; f < filas; f++){
            tabla[f][c] = fila[f];
            let cuadro = document.getElementById(f.toString() + "-" + c.toString());
            let num = tabla[f][c];
            ActualizarVentana(cuadro, num);
        }
    }
}

function CreaDos() {
    if (!Vacio()) {
        return;
    }
    let bandera = false;
    while (!bandera) {
        //crea dos numeros 2 en posiciones random
        let f = Math.floor(Math.random() * filas);
        let c = Math.floor(Math.random() * columnas);
        if (tabla[f][c] == 0) {
            let num = Math.random() < 0.8 ? 2 : 4;
            tabla[f][c] = num;
            suma += num;
            let cuadro = document.getElementById(f.toString() + "-" + c.toString());
            cuadro.innerText = num,toString();
            cuadro.classList.add("n" + num.toString());
            bandera = true;
        }
    }
    
}

function finaliza(){
    
    if (!Vacio()){
        
        for (let f = 0; f < filas; f++) {
            for (let c = 0; c < columnas - 1; c++) {
                if (tabla[f][c] == tabla[f][c+1]) { 
                    return false;
                }
            }
        }

        for (let f = 0; f < filas - 1; f++) {
            for (let c = 0; c < columnas; c++) {
                if(tabla[f][c] == tabla[f+1][c]){
                    return false;
                } 
            }
        }
               
        return true;

    }


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

