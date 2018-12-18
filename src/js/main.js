import "../scss/main.scss";
require('intersection-observer');

window.addEventListener('load', function () {
    let sliderLogo = document.querySelectorAll(".logo");
    let info = document.querySelector('.info');
    let container = document.querySelector(".container");
    let slider = document.querySelector(".slider__content");
    let sliderParent = document.querySelector(".slider");
    let arrowDown = document.querySelector(".arrow--down");
    let arrowLeft = document.querySelector(".arrow--left");
    let arrowRight = document.querySelector(".arrow--right");
    let slides = document.querySelectorAll(".slide");
    let cube = document.querySelector('.d__cube');
    let currentSlide = 1;

    //show info

    sliderLogo.forEach(logo => {
        logo.addEventListener('click', () => {
            container.classList.toggle("show-info");
        });
    });

    //navigate slider
    arrowDown.addEventListener('click', e => {
        if (TweenLite) {
            e.preventDefault();
            TweenLite.to(slider, .5, { scrollTo: "#slide" + (parseInt(currentSlide) + 1) });
        }
    });

    arrowLeft.addEventListener('click', e => {
        let current = document.querySelector(".show-slide");
        let currentNumber = parseInt(current.dataset.id) - 1;
        if (current) {
            e.stopPropagation();
            slides[currentNumber > 0 ? currentNumber - 1 : slides.length - 1].classList.add("show-slide");
            current.classList.remove("show-slide");
        }
    });

    arrowRight.addEventListener('click', e => {
        let current = document.querySelector(".show-slide");
        let currentNumber = parseInt(current.dataset.id) - 1;
        if (current) {
            e.stopPropagation();
            slides[currentNumber < slides.length - 1 ? currentNumber + 1 : 0].classList.add("show-slide");
            current.classList.remove("show-slide");
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

    //zoom in 

    sliderParent.addEventListener('click', function () {
        sliderParent.classList.toggle("slider--small");
        cube.classList.toggle("d__cube--big");
    })

});