import "../sass/style.scss";

const apiUrl = "https://dog.ceo/api";
const imgEl = document.querySelector(".featured-dog img");
const bgcEl = document.querySelector(".featured-dog__background");
const tilesEl = document.querySelector(".tiles");
const spinnerEl = document.querySelector(".spinner");

function showLoading() {
    spinnerEl.classList.add("spinner--visible");
}

function hideLoading() {
    spinnerEl.classList.remove("spinner--visible");
}

function listBreeds() {
    return fetch(`${apiUrl}/breeds/list/all`)
        .then(resp => resp.json())
        .then(data => data.message);
}

listBreeds().then(breeds => console.log(breeds));

function getRandomImage() {
    return fetch(`${apiUrl}/breeds/image/random`)
        .then(resp => resp.json())
        .then(data => data.message);
}

function getRandomImageByBreed(breed) {
    return fetch(`${apiUrl}/breed/${breed}/images/random`)
        .then(resp => resp.json())
        .then(data => data.message);
}

showLoading();

getRandomImage().then(src => {
    imgEl.setAttribute("src", src);
    bgcEl.style.background = `url("${src}")`;

    hideLoading();
});

showAllBreeds();

function addBreed(breed, subBreed) {
    let name;
    let type;

    if (typeof subBreed === "undefined") {
        name = breed;
        type = breed;
    } else {
        name = `${breed} ${subBreed}`;
        type = `${breed} / ${subBreed}`;
    }
    const tile = document.createElement("div");
    tile.classList.add("tiles__tile");

    const tileContent = document.createElement("div");
    tileContent.classList.add("tiles__tile-content");

    tileContent.innerText = name;
    tileContent.addEventListener("click", () => {
        window.scrollTo(0, 0);
        showLoading();
        getRandomImageByBreed(type).then(src => {
            imgEl.setAttribute("src", src);
            bgcEl.style.background = `url("${src}")`;
            hideLoading();
        });
    });
    tile.appendChild(tileContent);
    tilesEl.appendChild(tile);
}

function showAllBreeds() {
    listBreeds().then(breeds => {
        for (const breed in breeds) {
            if (breeds[breed].length === 0) {
                addBreed(breed);
            } else {
                for (const subBreed of breeds[breed]) {
                    addBreed(breed, subBreed);
                }
            }
        }
    });
}
