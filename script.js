const html = document.querySelector("html")

const focoBt = document.querySelector(".app__card-button--foco")
const curtoBt = document.querySelector(".app__card-button--curto")
const longoBt = document.querySelector(".app__card-button--longo")
const banner = document.querySelector(".app__image")
const titulo = document.querySelector(".app__title")
const botoes = document.querySelectorAll(".app__card-button")
const startPauseBt = document.querySelector("#start-pause")
const startOrPauseBt = document.querySelector("#start-pause span")
const musicaFocoInput = document.querySelector("#alternar-musica")
const musica = new Audio("sons/here-comes-the-boy.mp4")
musica.loop = true
const audioPlay = new Audio('/sons/play.wav');
const audioPausa = new Audio('/sons/pause.mp3');
const audioTempoFinalizado = new Audio('./sons/beep.mp3')
const buttonIcon = document.querySelector(".app__card-primary-butto-icon")
const tempoNaTela = document.querySelector("#timer")

let tempoDecorridoEmSegundos = 1500
let intervaloId = null

musicaFocoInput.addEventListener("change", ()=>{
    if(musica.paused){
        musica.play()
    }else{
        musica.pause()
    }
})

focoBt.addEventListener("click", ()=>{
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco', `Hora de voltar à superfície.
    <strong class="app__title-strong"> Faça uma pausa longa.</strong>`)
    focoBt.classList.add("active")
})

curtoBt.addEventListener("click", ()=>{
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto', `Que tal dar uma respirada? 
    <strong class="app__title-strong">Faça uma pausa curta!</strong>`)
    curtoBt.classList.add("active")
})

longoBt.addEventListener("click", ()=>{
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo', `Otimize sua produtividade,<br>
    <strong class="app__title-strong">mergulhe no que importa.</strong>`)
    longoBt.classList.add("active")
})

function alterarContexto(contexto, mensagem){
    mostrarTempo()
    botoes.forEach(function(contexto){contexto.classList.remove('active')});
    html.setAttribute("data-contexto", `${contexto}`);
    banner.setAttribute("src", `imagens/${contexto}.png`);
    titulo.innerHTML = `${mensagem}`
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0) {
        audioTempoFinalizado.play() 
        alert('Tempo finalizado')
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

startPauseBt.addEventListener("click", iniciarOuPausar)

function zerar(){
    clearInterval(intervaloId)
    intervaloId = null
    startOrPauseBt.textContent = "Comecar"
    buttonIcon.setAttribute("src", "imagens/play_arrow.png")
}

function iniciarOuPausar() {
    if (intervaloId) {
        audioPausa.play();
        zerar()
        return // early return -- circuit breaker
    }
    audioPlay.play();  
    intervaloId = setInterval(contagemRegressiva, 1000)
    startOrPauseBt.textContent = "Pausar"
    buttonIcon.setAttribute("src", "imagens/pause.png")
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString("pt-br", {minute: "2-digit", second: "2-digit"})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo();