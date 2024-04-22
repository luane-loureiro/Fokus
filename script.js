const html = document.querySelector('html');

const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector ('.app__card-button--logo');

focoBt.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'foco')
})