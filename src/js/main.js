import "../scss/main.scss";

window.addEventListener('load', function () {
    let sliderLogo = document.querySelectorAll(".logo");
    let info = document.querySelector('.info');
    let container = document.querySelector(".container");

    sliderLogo.forEach(logo => {
        logo.addEventListener('click', () => {
            container.classList.toggle("show-info");
        });
    });
})