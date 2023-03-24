const btn = document.querySelector('.btn');


btn.addEventListener('click', () => {
    alert (`
        Ширина экрана - ${window.screen.width}
        Высота экрана - ${window.screen.height}
    `)
})