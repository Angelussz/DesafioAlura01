const encriptar = document.getElementById("encriptar");
const desencriptar = document.getElementById("desencriptar");
const copiar = document.getElementById("copiar");

const inputText = document.getElementById("input-text");
const outputText = document.getElementById("output-text")

//Reglas
const reglas = {
    a:"ai",
    e:"enter",
    i:"imes",
    o:"ober",
    u:"ufat"
}



const encriptarcion = (frase)=>{
    let fraseEncriptada = ""
    for(let letra of frase){
        if(letra in reglas){
            fraseEncriptada = fraseEncriptada+reglas[letra]
        }
        else{
            fraseEncriptada = fraseEncriptada+letra
        }

    }
    return fraseEncriptada
}

const desencriptacion = (frase)=>{
    let fraseDesencriptada = ""
    let letra;
    for (let i = 0; i < frase.length; i++) {
        letra = frase[i];
        if(letra in reglas){
            const tamanhoDesencriptar = reglas[letra].length;
            const subfrase = frase.slice(i,i+tamanhoDesencriptar);
            if(subfrase === reglas[letra]){
                fraseDesencriptada = fraseDesencriptada + letra;
                i = i+tamanhoDesencriptar-1;
                continue;
            }
        }

        fraseDesencriptada = fraseDesencriptada+letra;
        
    }
    return fraseDesencriptada
}

// Encriptar
encriptar.addEventListener("click",(e)=>{
    e.preventDefault();
    const fraseOriginal = inputText.value.trim();
    outputText.value = encriptarcion(fraseOriginal);
})

desencriptar.addEventListener("click",(e)=>{
    e.preventDefault();
    const fraseEncriptada = inputText.value.trim();
    outputText.value = desencriptacion(fraseEncriptada);
})
