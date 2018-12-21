let data = [

    { firstname: 'camila', lastname: 'lamarca' },
    { firstname: 'carolina', lastname: 'zancolli' },
    { firstname: 'claudia', lastname: 'cortinez' },
    { firstname: 'florencia', lastname: 'walter' },
    { firstname: 'samuel', lastname: 'lasso' },
    { firstname: 'sol', lastname: 'pochat' }
];

const shuffle = array => [...array].sort(() => Math.random() - 0.5);

const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

function generateSlides() {
    let str = '';
    let content = document.querySelector(".slider__content");
    let shuffledData = shuffle(data);

    // let shuffledData = randomIndexes.map(i => data[i]);

    shuffledData.forEach((el, index) => {

        str += `<div id="slide${index + 1}" data-id="${index + 1}" class="slide ${index == 0 ? 'show-slide' : ''}">
                <div class="slide__img-wrapper slide__img-wrapper--${el.firstname}_${el.lastname}"></div>
                    <h2 class="slide__artist">
                    ${el.firstname} ${el.lastname}
                    </h2>
                    <a href="../assets/${capitalize(el.firstname)} ${capitalize(el.lastname)}.pdf" class="slide__portfolio" download>
                        portfolio
                    </a>
                    <div class="arrow arrow--down slide__arrow slide__arrow--down">
                        <div class="arrow__content"></div>
                    </div>
                </div>`
    });

    content.innerHTML = str;

}

generateSlides();