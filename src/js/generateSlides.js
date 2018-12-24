import data from './data.js';

const shuffle = array => [...array].sort(() => Math.random() - 0.5);

const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

let shuffledData = shuffle(data);

function generateSlides() {
    let str = '';
    let content = document.querySelector(".slider__content");

    shuffledData.forEach((el, index) => {

        str += `<div id="slide${index + 1}" data-id="${index + 1}" class="slide">
                <div class="slide__img-wrapper style="background-image:url(../img/${el.firstname}_${el.lastname}.png"></div>
                    <h2 class="slide__artist">
                    ${el.firstname} ${el.lastname}
                    </h2>
                    <a href="../assets/${capitalize(el.firstname)} ${capitalize(el.lastname)}.pdf" class="slide__portfolio" download>
                        portfolio
                    </a>
                    <div class="arrow arrow--down slide__arrow slide__arrow--down">
                        ${index + 1 >= shuffledData.length ? '' : '<div class="arrow__content"></div>'}
                    </div>
                </div>`
    });

    str += `<div class="arrow slider__arrow arrow--left">
                <div class="arrow__content"></div>
            </div>
            <div class="arrow slider__arrow arrow--right">
                <div class="arrow__content"></div>
            </div>`

    content.innerHTML = str;

}

export { generateSlides, shuffledData };