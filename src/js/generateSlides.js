import data from './data.js';

const shuffle = array => [...array].sort(() => Math.random() - 0.5);

const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

let shuffledData = shuffle(data);

function generateSlides() {
    let str = '';
    let artistStr = '';
    let navStr = '';
    let slider = document.querySelector(".slider__content");
    let cubeBack = document.querySelector(".d__cube-face--back");
    let artist = document.querySelector(".artist");
    let nav = document.querySelector(".nav");

    shuffledData.forEach((el, index) => {

        str += `<div id="slide${index}" data-id="${index}" class="slide">
                    <div class="slide__img-wrapper" style="background-image:url('../img/${el.firstname} ${el.lastname}.png');"></div>
                    <a href="../assets/${capitalize(el.firstname)} ${capitalize(el.lastname)}.pdf" class="slide__artist slide__artist--mobile" download>
                        ${capitalize(el.firstname)} ${capitalize(el.lastname)}
                    </a>
                    <a href="../assets/${capitalize(el.firstname)} ${capitalize(el.lastname)}.pdf" class="slide__portfolio slide__portfolio--mobile" download>
                        Portfolio
                    </a>
                </div > `

        artistStr += `<div class='artist__item'>
                        <a href="../assets/${capitalize(el.firstname)} ${capitalize(el.lastname)}.pdf" class="artist__name" download>
                        ${capitalize(el.firstname)} ${capitalize(el.lastname)}
                    </a>
                    <a href="../assets/${capitalize(el.firstname)} ${capitalize(el.lastname)}.pdf" class="artist__portfolio" download>
                        Portfolio
                    </a>
                    </div>`;

        navStr += `<a href='#slide${index}' class='nav__item'>
                        ${capitalize(el.lastname)}
                   </a>`;
    });

    slider.innerHTML = str;

    artist.innerHTML = artistStr;

    nav.innerHTML += navStr;


}

export { generateSlides, shuffledData };