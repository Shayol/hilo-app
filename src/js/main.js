import "../scss/main.scss";
import '../img/favicon.ico';

require('intersection-observer');

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
    let slides = document.querySelectorAll(".slide");
    let cube = document.querySelector('.d__cube');
    let back = document.querySelector(".d__cube-face--back");
    let timerId;
    let slideIndex = 0;
    let background1 = document.querySelector(".container__background--1");
    let background2 = document.querySelector(".container__background--2");
    let backgroundFirst = true;


    //show info

    sliderLogo.forEach(logo => {
        logo.addEventListener('click', (e) => {
            e.stopPropagation();
            container.classList.toggle("show-info");
        });
    });

    //navigate slider
    // arrowDown.addEventListener('click', e => {
    //     if (slideIndex < slides.length - 1) {

    //         if (TweenLite) {

    //             TweenLite.to(slider, .5, { scrollTo: "#slide" + (slideIndex + 1) });
    //         }
    //     }
    //     else {
    //         if (TweenLite) {

    //             TweenLite.to(slider, 0, { scrollTo: "#slide0" });
    //         }
    //     }
    // });

    const intersectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.intersectionRatio > 0.3) {
                slideIndex = parseInt(entry.target.dataset.id);
            }

        });
    }, { threshold: 0.6 });

    slides.forEach((element) => intersectionObserver.observe(element));


    function moveRight(e) {
        let current = document.querySelector(".show-slide");
        let currentNumber = parseInt(current.dataset.id);
        if (current) {
            if (e) e.stopPropagation();
            let newIndex = currentNumber > 0 ? currentNumber - 1 : slides.length - 1;
            let newSlide = slides[newIndex];
            newSlide.classList.add("show-slide");
            current.classList.remove("show-slide");
            setTimeout(changeBorder, 400, newIndex);
            // changeBorder(newIndex);
        }
    }

    function moveLeft(e) {
        let current = document.querySelector(".show-slide");
        let currentNumber = parseInt(current.dataset.id);
        if (current) {
            if (e) e.stopPropagation();
            let newIndex = currentNumber < slides.length - 1 ? currentNumber + 1 : 0;
            let newSlide = slides[newIndex];
            newSlide.classList.add("show-slide");
            current.classList.remove("show-slide");

            setTimeout(changeBorder, 400, newIndex);
            // changeBorder(newIndex);
        }
    }


    function changeBorder(newIndex) {
        let slide = shuffledData[newIndex]
        let url = `url(../img/${slide.firstname}_${slide.lastname}.png)`;
        if (!backgroundFirst) {
            background1.style.backgroundImage = url;
            background1.style.backgroundPosition = slide.backgroundPosition;
            background1.style.opacity = '1';
            background2.style.opacity = '0';
        }
        else {
            background2.style.backgroundImage = url;
            background2.style.backgroundPosition = slide.backgroundPosition;
            background1.style.opacity = '0';
            background2.style.opacity = '1';
        }

        backgroundFirst = !backgroundFirst;

    }

    //intro animation
    slides[0].classList.add("show-slide");

    setTimeout(() => {
        // background1.style.backgroundColor = "transparent";
        changeBorder(0);
        runTimer();
    }, 800);

    //change slides every 3secs

    function runTimer() {
        timerId = setInterval(() => {
            moveRight();
        }, 5000);
    }


    function checkTimer() {
        if (cube.classList.contains("d__cube--big")) {
            clearInterval(timerId);
        }
        else {
            clearInterval(timerId);
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
                checkTimer();
            case "ArrowLeft":
                moveLeft(e);
                checkTimer();
                break;
            case "Right": // IE/Edge specific value
                moveRight(e);
                checkTimer();
            case "ArrowRight":
                moveRight(e);
                checkTimer();
                break;
            case " ":
                zoom(e);
                break;
            case "Esc": // IE/Edge specific value
                zoom(e);
            case "Escape":
                // Do something for "esc" key press.
                zoom(e);
                break;
            default:
                return; // Quit when this doesn't handle the key event.
        }

        // Cancel the default action to avoid it being handled twice
        event.preventDefault();
    }, true);

});