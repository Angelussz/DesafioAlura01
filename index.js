const encriptar = document.getElementById("encriptar");
const desencriptar = document.getElementById("desencriptar");
const copiar = document.getElementById("copiar");

const resultado = document.getElementById("resultado");
const inputText = document.getElementById("input-text");
const outputText = document.querySelector(".output-text__texto");
const advertencia = document.getElementById("mensaje-advertencia");

const imagenMunheco = document.getElementById("munheco");

//Reglas
const reglas = {
  a: "ai",
  e: "enter",
  i: "imes",
  o: "ober",
  u: "ufat",
};


const encriptarcion = (frase) => {
  let fraseEncriptada = "";
  for (let letra of frase) {
    if (letra in reglas) {
      fraseEncriptada = fraseEncriptada + reglas[letra];
    } else {
      fraseEncriptada = fraseEncriptada + letra;
    }
  }
  return fraseEncriptada;
};

const desencriptacion = (frase) => {
  let fraseDesencriptada = "";
  let letra;
  for (let i = 0; i < frase.length; i++) {
    letra = frase[i];
    if (letra in reglas) {
      const tamanhoDesencriptar = reglas[letra].length;
      const subfrase = frase.slice(i, i + tamanhoDesencriptar);
      if (subfrase === reglas[letra]) {
        fraseDesencriptada = fraseDesencriptada + letra;
        i = i + tamanhoDesencriptar - 1;
        continue;
      }
    }

    fraseDesencriptada = fraseDesencriptada + letra;
  }
  return fraseDesencriptada;
};

const frasesMostrar = (vacio) => {
  if (vacio) {
    if (window.innerWidth > 1024) {
      imagenMunheco.style.display = "block";
    }
    outputText.classList.replace("ocultar", "mostrar");
    resultado.classList.replace("mostrar", "ocultar");
    copiar.classList.replace("mostrar", "ocultar");
  } else {
    if (window.innerWidth > 1024) {
      imagenMunheco.style.display = "none";
    }
    outputText.classList.replace("mostrar", "ocultar");
    resultado.classList.replace("ocultar", "mostrar");
    copiar.classList.replace("ocultar", "mostrar");
  }
};

// Encriptar
encriptar.addEventListener("click", (e) => {
  e.preventDefault();
  const fraseOriginal = inputText.value.trim();
  const validarMayusculas = /[A-Z]/;
  const validarAcentos = /[ÁÉÍÓÚÑÜáéíóúñü]/i;
  if (!fraseOriginal.length) {
    frasesMostrar(true);
    return;
  }
  if (
    validarMayusculas.test(fraseOriginal) ||
    validarAcentos.test(fraseOriginal)
  ) {
    frasesMostrar(true);
    advertencia.style.color = "red";
    return;
  }

  advertencia.style.color = "#0a3871";
  frasesMostrar(false);
  resultado.innerText = encriptarcion(fraseOriginal);
  console.log(resultado.innerText);
});

desencriptar.addEventListener("click", (e) => {
  e.preventDefault();
  const fraseEncriptada = inputText.value.trim();
  if (!fraseEncriptada.length) {
    return;
  }
  resultado.innerText = desencriptacion(fraseEncriptada);
});

copiar.addEventListener("click",async() => {
    // console.log("copiar");
  try {
    await navigator.clipboard.writeText(resultado.innerText);
    console.log("Texto copiado al portapapeles");
  } catch (err) {
    console.error("Error al copiar al portapapeles:", err);
  }
});

inputText.addEventListener("input", () => {
  inputText.style.height = "auto";
  inputText.style.height = `${inputText.scrollHeight}px`;
});
window.addEventListener('resize', function() {
  if (window.innerWidth > 1024 && resultado.innerText) {
    imagenMunheco.style.display="none";   
  }
});
