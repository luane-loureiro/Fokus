const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector ('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const startPauseBt = document.querySelector('#start-pause');
const botoes = document.querySelectorAll('.app__card-button');
const musicaFocoInput = document.querySelector('#alternar-musica');
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const pausePlayIcon = document.querySelector('.app__card-primary-butto-icon');
const displayTime = document.querySelector('#timer');

const duracaoFoco = 1500; 
const duracaoDescansoCurto = 300; 
const duracaoDescansoLongo = 900; 

const musica = new Audio('sons/luna-rise-part-one.mp3');
const somPlay = new Audio('sons/play.wav');
const somPause = new Audio('sons/pause.mp3');
const somTimeUp = new Audio('sons/beep.mp3');

let tempoDecorrido = 1500;
let intervaloId = null;

musica.loop = true;

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
            musica.play()
        } else {
            musica.pause()
        }
})

focoBt.addEventListener('click', () => {
    tempoDecorrido = duracaoFoco;
    alterarContexto('foco');
    focoBt.classList.add('active');
})

curtoBt.addEventListener('click', () => {
    tempoDecorrido = duracaoDescansoCurto;
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
})

longoBt.addEventListener('click', () => {
    tempoDecorrido = duracaoDescansoLongo;
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
})

function alterarContexto(contexto) {
    showTime();
    botoes.forEach(function(contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `imagens/${contexto}.png`)
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            </h1>`
            break;

        case 'descanso-curto':
            titulo.innerHTML = `
                Que tal dar uma respirada?,<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>
            </h1>`
            break;

        case 'descanso-longo':
                titulo.innerHTML = `
                    Hora de voltar à superfície.<br>
                    <strong class="app__title-strong">Faça uma pausa longa.</strong>
                </h1>`
            break;

        default:
            break;
    }
}

const contagemRegressiva = () =>{
    if(tempoDecorrido <=0){
        somTimeUp.play();
        alert('tempo finalizado');
        zerar();
        return;
    }
    tempoDecorrido -= 1;
    showTime();
}
startPauseBt.addEventListener('click', iniciarOuPausar);


function iniciarOuPausar(){
    if(intervaloId){
        somPause.play();
        zerar();
        return;
    }
    somPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBt.textContent = 'Pausar';
    pausePlayIcon.setAttribute('src', `/imagens/pause.png`);
}

function zerar(){
    clearInterval(intervaloId);
    iniciarOuPausarBt.textContent = 'Começar';
    pausePlayIcon.setAttribute('src', `/imagens/play_arrow.png`);
    intervaloId = null;
}

function showTime(){
    const time = new Date(tempoDecorrido * 1000);
    const minutos = time.getMinutes().toString().padStart(2, '0');
    const segundos = time.getSeconds().toString().padStart(2, '0');
    displayTime.innerHTML = `${minutos}:${segundos}`;

}





showTime();
