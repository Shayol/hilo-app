import "../scss/main.scss";
import '../img/favicon.ico';
require('intersection-observer');
import { generateSlides, shuffledData } from './generateSlides';

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});

generateSlides();
window.addEventListener('load', function () {
    let sliderLogo = document.querySelectorAll(".logo__wrapper");
    let container = document.querySelector(".container");
    let slider = document.querySelector(".slider__content");
    let sliderParent = document.querySelector(".slider");
    let slides = document.querySelectorAll(".slide");
    let cube = document.querySelector('.d__cube');
    let back = document.querySelector(".d__cube-face--back");
    let sliderWrapper = document.querySelector(".slider__wrapper");
    let timerId;
    let slideIndex = 0;
    let background1 = document.querySelector(".container__background--1");
    let background2 = document.querySelector(".container__background--2");
    let blackCube = document.querySelector(".container__background--3");
    let intro = document.querySelector(".intro");
    let scrollNav = document.querySelectorAll(".nav__item");
    let backgroundFirst = true;
    let artists = document.querySelectorAll(".artist__item");
    let navScrollInProgress = false;
    let tablet = window.matchMedia(`(max-width: 1024px),(min-device-width: 1024px) and (max-device-width: 1024px)
    ,(device-width: 1366px) and (device-height: 1024px) `);

    function init() {
        if (!tablet.matches) {
            //intro animation
            intro.addEventListener("animationend", introAnimation);
            let currentSlide = document.querySelector(".show-slide");
            currentSlide.addEventListener("animationend", () => {

                currentSlide.style.animation = "initial";
                changeBorder(0);
                runTimer();
                setTimeout(function () {
                    sliderParent.classList.add("slider--big");
                    cube.classList.add("d__cube--big");
                }, 2850);
            }
            );
        }
        else {
            tabletAndMobileAnimation();
        }

        checkInteraction();

    }

    init();

    function introAnimation() {
        intro.style.animation = "initial";
        document.documentElement.style.setProperty('--edge-width', "5px");
        intro.removeEventListener("animationend", introAnimation);
    }

    function tabletAndMobileAnimation() {
        let currentSlide = document.querySelector(".show-slide");
        currentSlide.style.animation = "initial";
        intro.style.animation = "initial";
        blackCube.style.animation = "initial";
        document.documentElement.style.setProperty('--edge-width', "5px");
        runTimer();
    }


    function checkInteraction() {
        window.addEventListener('click', detectInteraction);
        window.addEventListener('touchstart', detectInteraction);
        slider.addEventListener('wheel', detectInteraction);
    }



    function detectInteraction() {
        clearInterval(timerId);
        slider.classList.add("slider--slides-visible");
        window.removeEventListener('click', detectInteraction);
        window.removeEventListener('touchstart', detectInteraction);
        slider.removeEventListener('wheel', detectInteraction);
    }


    //show info
    sliderLogo.forEach(logo => logo.addEventListener('click', (e) => container.classList.toggle("show-info")));



    //scroll to slide when nav clicked
    scrollNav.forEach(el => {
        el.addEventListener('click', e => {
            if (TweenLite) {
                e.preventDefault();
                let n = parseInt(el.href.split("#slide")[1]);
                let topOffset = slider.clientHeight * n;
                navScrollInProgress = true;
                //prevents nav dots for slides that's not the tagret lighting up when user clicks on nav
                TweenLite.to(slider, 1, { scrollTo: topOffset, onComplete: () => navScrollInProgress = false });
                activateNav(el);
            }
        }
        );
    }
    );

    function activateNav(nav) {
        scrollNav.forEach(nav => nav.classList.remove("scrolled"));
        nav.classList.add("scrolled");
    }

    const intersectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            let artist = artists[parseInt(entry.target.dataset.id)];
            if (entry.intersectionRatio >= 0.6) {
                if (!navScrollInProgress) { }
                artists.forEach(artist => {
                    artist.style.zIndex = "-1";
                    artist.style.opacity = "0";
                });
                artist.style.zIndex = "1";
                artist.style.opacity = "1";

                slideIndex = parseInt(entry.target.dataset.id);
                let newSlide = slides[slideIndex];

                if (!newSlide.classList.contains("show-slide")) {
                    let currentSlide = document.querySelector(".show-slide");
                    currentSlide.classList.remove("show-slide");
                    newSlide.classList.add("show-slide");
                    setTimeout(changeBorder, 850, slideIndex);
                }
                //show active nav when corresponding slide is visible
                if (!navScrollInProgress) {
                    let nav = document.querySelector(`[href='#slide${slideIndex}']`);
                    activateNav(nav);

                }
            }
        }
        );
    }, { threshold: 0.6 });

    slides.forEach((element) => intersectionObserver.observe(element));


    function moveLeft(e) {
        let current = document.querySelector(".show-slide");
        let currentNumber = parseInt(current.dataset.id);
        if (current) {
            // if (e) e.stopPropagation();
            let newIndex = currentNumber > 0 ? currentNumber - 1 : slides.length - 1;
            let newSlide = slides[newIndex];
            current.classList.remove("show-slide");
            if (TweenLite) {
                TweenLite.to(slider, 0, { scrollTo: slider.clientHeight * newIndex });
            }
            newSlide.classList.add("show-slide");
            setTimeout(changeBorder, 850, newIndex);
        }
    } //show slide to the right
    function moveRight(e) {
        let current = document.querySelector(".show-slide");
        let currentNumber = parseInt(current.dataset.id);
        if (current) {
            let newIndex = currentNumber < slides.length - 1 ? currentNumber + 1 : 0;
            let newSlide = slides[newIndex];
            current.classList.remove("show-slide");
            if (TweenLite) {
                setTimeout(() => {
                    TweenLite.to(slider, 0, {
                        scrollTo: slider.clientHeight * newIndex
                    }
                    );
                }
                    , 850);
            }
            newSlide.classList.add("show-slide");
            setTimeout(changeBorder, 850, newIndex);
        }
    } //change cubes edge background when gallary image changes
    function changeBorder(newIndex) {
        let slide = shuffledData[newIndex];
        let url = `url('../hilo-app/img/${slide.firstname} ${slide.lastname}.png')`;
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
    } //change slides every 4secs
    function runTimer() {
        timerId = setInterval(() => { moveRight() }, 4000);
    }
    function stopTimer() {
        clearInterval(timerId);
    } //zoom in 
    sliderWrapper.addEventListener('click', zoom);
    function zoom() {
        sliderParent.classList.toggle("slider--big");
        cube.classList.toggle("d__cube--big");
    }
    //change slides on key press
    window.addEventListener('keydown', (e) => {
        if (e.defaultPrevented) {
            return; // Do nothing if the event was already processed
        }
        switch (e.key) {
            case "Left": // IE/Edge specific value
                moveLeft(e);
                stopTimer();
            case "ArrowLeft": moveLeft(e);
                stopTimer();
                break;
            case "Right": // IE/Edge specific value
                moveRight(e);
                stopTimer();
            case "ArrowRight": moveRight(e);
                stopTimer();
                break;
            case " ": zoom(e);
                stopTimer();
                break;
            case "Esc": // IE/Edge specific value
                stopTimer();
                zoom(e);
            case "Escape": // Do something for "esc" key press.
                stopTimer();
                zoom(e);
                break;
            default: return; // Quit when this doesn't handle the key event.
        } // Cancel the default action to avoid it being handled twice
        event.preventDefault();
    }
        , true);
}

);