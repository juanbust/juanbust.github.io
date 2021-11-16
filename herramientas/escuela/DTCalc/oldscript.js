const val = [7,6,5,6,5,5,6,6,1,4,6,5,7,6,6,6,6,7,6,6,6,6,7,9,7,7,6, 5,5,4,5,5,4,5,5,1,1,5,2,7,5,5,5,5,5,4,5,4,5,5,7,5,5,5, 6, 5,3,5,5,6,5,5,5,5,5, 2,2,2,2,1,5,1,2,1,2,2,5,5,5,5];
const valind = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz 0123456789[]()!?.,:;'\"+-="

window.onload = setvals();

function setvals() {
    var frase = document.getElementById("frase").value;
    var alturaLetra = document.getElementById("letralt").value;
    var longRenglon = document.getElementById("longitudreng").value;
    var longitud = 0;
    var cuantosaltarparacentrar = 0;
    var eraLetra = false;
    var guialongs = [];
    // eliminar todas las columnas
    document.getElementById("filaLetra").innerHTML = ""; 
    document.getElementById("filaLongitud").innerHTML = "";

    // calcular
    for (let i = 0; i != frase.length; i++) {
        let char = frase.charAt(i);
        let ind = valind.indexOf(char);
        if (eraLetra && char != " ") // si el anterior caracter no era un espacio, añadir la separación entre letras
        {
            longitud += 2;
            //guialongs.push(altRound(alturaLetra / 10 * 2));
        }
        longitud += val[ind]; // añadir la longitud del caracter a la longitud total
        //guialongs.push(char + ":" + altRound(alturaLetra / 10 * val[ind])); // añadir la longitud del caracter a la guía
        document.getElementById("filaLetra").insertCell(-1).innerHTML = char; // añadir una columna con el caracter a la guía
        document.getElementById("filaLongitud").insertCell(-1).innerHTML = altRound(alturaLetra / 10 * val[ind]); // añadir una columna con la longitud del caracter a la guía
        if (char != " ") // si el caracter actual no es un espacio, establecer eraLetra a true
        {
            eraLetra = true;
        } else {
            eraLetra = false;
        }

    }
    cuantosaltarparacentrar = (longRenglon - longitud) / 2;
    longitud = (alturaLetra / 10) * longitud;
    document.getElementById("resultadolong").innerText = altRound(longitud) + "mm";
    document.getElementById("resultadocent").innerText = cuantosaltarparacentrar > 0 ? cuantosaltarparacentrar + "mm" : "no entra";
    document.getElementById("resultadoesplet").innerText = altRound(alturaLetra / 10 * 2) + "mm";
    document.getElementById("resultadoesppal").innerText = altRound(alturaLetra / 10 * 6) + "mm";
    document.getElementById("resultadoguia").innerText = guialongs.join(",  ");
}

function altRound(num)
{
	let absnum = Math.abs(num);
	return absnum > Math.floor(absnum) + 0.25 && absnum < Math.floor(absnum) + 0.75 ? Math.floor(absnum) + 0.5 : Math.round(num);
}