import "../scss/main.scss";
import '../img/favicon.ico';

// import '../assets/Camila Lamarca.pdf';
// import '../assets/Carolina Zancolli.pdf';
// import '../assets/Claudia Cortinez.pdf';
// import '../assets/Florencia Walter.pdf';
// import '../assets/Samuel Lasso.pdf';
// import '../assets/Sol Pochat.pdf';

import { generateSlides, shuffledData } from './generateSlides';

generateSlides();

// var vh = document.documentElement.clientHeight * 0.01;
// document.documentElement.style.setProperty('--vh', `${vh}px`);

// var zoomW = (document.documentElement.clientWidth / (back.clientWidth - 10)).toFixed(2);
// var zoomH = (document.documentElement.clientHeight / (back.clientHeight - 10)).toFixed(2);
// var zoom = zoomW > zoomH ? zoomW : zoomH;

// document.documentElement.style.setProperty('--brUp', `${zoom}`);

// window.addEventListener('resize', () => {
//     vh = document.documentElement.clientHeight * 0.01;
//     document.documentElement.style.setProperty('--vh', `${vh}px`);

//     // var zoomW = (document.documentElement.clientWidth / (back.clientWidth - 10)).toFixed(2);
//     // var zoomH = (document.documentElement.clientHeight / (back.clientHeight - 10)).toFixed(2);
//     // var zoom = zoomW > zoomH ? zoomW : zoomH;

//     // document.documentElement.style.setProperty('--zoom', `${zoom}`);
// })

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
    let back = document.querySelector(".d__cube-face--back");
    let timerId;


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
            else {
                if (TweenLite) {

                    TweenLite.to(slider, 0, { scrollTo: "#slide1" });
                }
            }
        });
    })

    //loop scroll

    slider.addEventListener('scroll', function (event) {
        let element = event.target;
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
            console.log('scrolled');
            if (TweenLite) {

                TweenLite.to(slider, 0, { scrollTo: "#slide1" });
            }
        }
    });

    //desktop slider navigation

    arrowLeft.addEventListener('click', moveLeft);

    arrowRight.addEventListener('click', moveRight);

    function moveRight(e) {
        let current = document.querySelector(".show-slide");
        let currentNumber = parseInt(current.dataset.id) - 1;
        if (current) {
            if (e) e.stopPropagation();
            let newIndex = currentNumber > 0 ? currentNumber - 1 : slides.length - 1;
            let newSlide = slides[newIndex];
            newSlide.classList.add("show-slide");
            current.classList.remove("show-slide");
            changeBorder(newIndex);
        }
    }

    function moveLeft(e) {
        let current = document.querySelector(".show-slide");
        let currentNumber = parseInt(current.dataset.id) - 1;
        if (current) {
            if (e) e.stopPropagation();
            let newIndex = currentNumber < slides.length - 1 ? currentNumber + 1 : 0;
            let newSlide = slides[newIndex];
            newSlide.classList.add("show-slide");
            current.classList.remove("show-slide");

            changeBorder(newIndex);
        }
    }


    function changeBorder(newIndex) {
        let slide = shuffledData[newIndex]
        let url = `url(../img/${slide.firstname}_${slide.lastname}.png)`;
        container.style.backgroundImage = url;
        container.style.backgroundPosition = slide.backgroundPosition;
    }

    //intro animation
    setTimeout(() => {
        let background = document.querySelector(".container__background");
        let intro = document.querySelector(".d__intro");
        changeBorder(0);
        background.style.opacity = '0';
        intro.style.opacity = '0';
        intro.style.zIndex = '-1';
        setTimeout(() => {
            slides[0].classList.add("show-slide");
            runTimer();
        }, 850);

    }, 250);

    //change slides every 3secs

    function runTimer() {
        timerId = setInterval(() => {
            moveRight();
        }, 3000);
    }


    function checkTimer() {
        if (cube.classList.contains("d__cube--big")) {
            clearInterval(timerId);
        }
        else {
            runTimer();
        }

    }

    //zoom in 

    back.addEventListener('click', zoom);

    function zoom(e) {
        if (e && e.target.classList.contains("slide__portfolio") || container.classList.contains("show-info")) {
            return;
        }
        sliderParent.classList.toggle("slider--small");
        cube.classList.toggle("d__cube--big");
        checkTimer();
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