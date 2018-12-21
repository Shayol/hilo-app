import "../scss/main.scss";
import '../img/favicon.ico';

import '../assets/Camila Lamarca.pdf';
import '../assets/Carolina Zancolli.pdf';
import '../assets/Claudia Cortinez.pdf';
import '../assets/Florencia Walter.pdf';
import '../assets/Samuel Lasso.pdf';
import '../assets/Sol Pochat.pdf';

import generateSlides from './generateSlides';

generateSlides();

var vh = document.documentElement.clientHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
    vh = document.documentElement.clientHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
})

window.addEventListener('load', function () {
    let sliderLogo = document.querySelectorAll(".logo");
    let info = document.querySelector('.info');
    let container = document.querySelector(".container");
    let slider = document.querySelector(".slider__content");
    let sliderParent = document.querySelector(".slider");
    let arrowDown = document.querySelectorAll(".arrow--down");
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
    arrowDown.forEach((arrow, index) => {
        arrow.addEventListener('click', e => {
            if (index < slides.length - 1) {

                if (TweenLite) {

                    TweenLite.to(slider, .5, { scrollTo: "#slide" + (index + 2) });
                }
            }
        });
    })

    arrowLeft.addEventListener('click', moveRight);

    arrowRight.addEventListener('click', moveLeft);

    function moveRight(e) {
        let current = document.querySelector(".show-slide");
        let currentNumber = parseInt(current.dataset.id) - 1;
        if (current) {
            e.stopPropagation();
            let newSlide = slides[currentNumber > 0 ? currentNumber - 1 : slides.length - 1];
            newSlide.classList.add("show-slide");
            current.classList.remove("show-slide");

            changeBorder(newSlide);
        }
    }

    function moveLeft(e) {
        let current = document.querySelector(".show-slide");
        let currentNumber = parseInt(current.dataset.id) - 1;
        if (current) {
            e.stopPropagation();
            let newSlide = slides[currentNumber < slides.length - 1 ? currentNumber + 1 : 0];
            newSlide.classList.add("show-slide");
            current.classList.remove("show-slide");

            changeBorder(newSlide);
        }
    }


    function changeBorder(newSlide) {
        //change border image for cube
        let el = newSlide.querySelector(".slide__img-wrapper");
        let computImg = getComputedStyle(el).backgroundImage.split("img/")[1]
        let img = computImg.substring(0, computImg.length - 2);
        cubeFace.forEach(c => c.style.backgroundImage = `url(../img/${img})`);
    }

    setTimeout(() => {
        changeBorder(slides[0]);
    }, 1100);


    //zoom in 

    sliderParent.addEventListener('click', zoom);

    function zoom(e) {
        if (e && e.target.classList.contains("slide__portfolio")) {
            return;
        }
        sliderParent.classList.toggle("slider--small");
        cube.classList.toggle("d__cube--big");
    }

    window.addEventListener('keydown', (e) => {
        if (e.defaultPrevented) {
            return; // Do nothing if the event was already processed
        }

        switch (e.key) {

            case "Left": // IE/Edge specific value
                moveLeft(e);
            case "ArrowLeft":
                moveLeft(e);
                break;
            case "Right": // IE/Edge specific value
                moveRight(e);
            case "ArrowRight":
                moveRight(e);
                break;
            case " ":
                zoom(e);
                break;
            default:
                return; // Quit when this doesn't handle the key event.
        }

        // Cancel the default action to avoid it being handled twice
        event.preventDefault();
    }, true);

});