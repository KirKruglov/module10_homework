const btn = document.querySelector('.btn');
const btnIcon = document.querySelector('.btn-icon');

btn.addEventListener('click', () => {
    btnIcon.classList.toggle('btn-icon2');
})