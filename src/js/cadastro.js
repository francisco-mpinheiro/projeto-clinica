const btnGenero = document.getElementById("btnGenero")
const opcoes = document.getElementById("opcoes")
opcoes.style.display = "none"
const img = document.getElementById("iGenero")
const texto = document.getElementById("textoButton")

function abrirOpcoes(){
    if (opcoes.style.display === "none"){
        opcoes.style.display = "flex";
        img.classList.remove("girar_esquerda")
        img.classList.add("girar_direita");
        texto.style.display = "none";
    }else{
        opcoes.style.display = "none";
        img.classList.remove("girar_direita")
        img.classList.add("girar_esquerda");
        texto.style.display = "flex";
    }
}