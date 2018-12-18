import "../scss/main.scss";
require('intersection-observer');

window.addEventListener('load', function () {
    let sliderLogo = document.querySelectorAll(".logo");
    let info = document.querySelector('.info');
    let container = document.querySelector(".container");
    let slider = document.querySelector(".slider__content");
    let arrowDown = document.querySelector(".slider__arrow--down");
    let slides = document.querySelectorAll(".slide");
    let currentSlide = 1;

    sliderLogo.forEach(logo => {
        logo.addEventListener('click', () => {
            container.classList.toggle("show-info");
        });
    });

    //scroll on mobile
    arrowDown.addEventListener('click', e => {
        if (TweenLite) {
            e.preventDefault();
            TweenLite.to(slider, 1, { scrollTo: "#slide" + (parseInt(currentSlide) + 1) });
        }
    });

    const intersectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.intersectionRatio > 0.3) {
                currentSlide = entry.target.dataset.id;
            }

        });
    }, { threshold: 0.6 });

    slides.forEach((element) => intersectionObserver.observe(element));

});