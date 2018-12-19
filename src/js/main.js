import "../scss/main.scss";
require('intersection-observer');
import '../img/favicon.ico';

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
    let cubeFace = document.querySelectorAll(".d__cube-face");
    let scene = document.querySelector(".d__scene");
    let currentSlide = 1;

    //show info

    sliderLogo.forEach(logo => {
        logo.addEventListener('click', (e) => {
            e.stopPropagation();
            container.classList.toggle("show-info");
        });
    });

    //navigate slider
    arrowDown.addEventListener('click', e => {
        if (TweenLite) {
            e.stopPropagation();
            if (parseInt(currentSlide) >= slides.length) {
                return;
            }
            TweenLite.to(slider, .5, { scrollTo: "#slide" + (parseInt(currentSlide) + 1) });
        }
    });

    arrowLeft.addEventListener('click', e => {
        let current = document.querySelector(".show-slide");
        let currentNumber = parseInt(current.dataset.id) - 1;
        if (current) {
            e.stopPropagation();
            let newSlide = slides[currentNumber > 0 ? currentNumber - 1 : slides.length - 1];
            newSlide.classList.add("show-slide");
            current.classList.remove("show-slide");

            changeBorder(newSlide);
        }
    });

    arrowRight.addEventListener('click', e => {
        let current = document.querySelector(".show-slide");
        let currentNumber = parseInt(current.dataset.id) - 1;
        if (current) {
            e.stopPropagation();
            let newSlide = slides[currentNumber < slides.length - 1 ? currentNumber + 1 : 0];
            newSlide.classList.add("show-slide");
            current.classList.remove("show-slide");

            changeBorder(newSlide);
        }
    });


    function changeBorder(newSlide) {
        //change border image for cube
        let el = newSlide.querySelector(".slide__img-wrapper");
        let computImg = getComputedStyle(el).backgroundImage.split("img/")[1]
        let img = computImg.substring(0, computImg.length - 2);
        cubeFace.forEach(c => c.style.borderImageSource = `url(../img/${img})`);
    }

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