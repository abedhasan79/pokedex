let buttonListEl = $(".keyboard");
var letters = [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    '_',
];

// Dynamically create buttons
// Create a for-loop to iterate through the letters array.
for (var i = 0; i < letters.length; i++) {
    // Create button
    var letterBtn = $('<button>');

    // Assign style to the button
    letterBtn.addClass('letter-button btn btn-info');
    // Assign the letter to the data-letter attribute
    letterBtn.attr('data-letter', letters[i]);
    letterBtn.attr('value', letters[i]);
    // Display the letter
    letterBtn.text(letters[i]);

    // Attach the letter element
    buttonListEl.append(letterBtn);
}

let letterOnSearch = document.querySelector(".letter");
buttonListEl.on('click', '.letter-button', function (event) {
    letterOnSearch.value += event.target.value;
    console.log(event.target.value);

});



let searchButton = document.querySelector('.search-pokemon');

let pokeApi = "https://pokeapi.co/api/v2/pokemon/?limit=151";
let pokeInfoMain = document.querySelector('.info-main');
let newUl = document.createElement('ul');
newUl.setAttribute("class", "pokemon-list-parent")
pokeInfoMain.append(newUl);

let pokemon = function (api) {
    fetch(api)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            for (let i = 0; i < data.results.length; i++) {
                // console.log(data.results[i].name);
                // console.log(data.results[i].url);
                let pokeUrl = data.results[i].url;
                let newLi = document.createElement('li');
                newLi.setAttribute('class', `pokemon-list`)
                newLi.textContent = data.results[i].name;
                newLi.setAttribute('value', data.results[i].name)
                newUl.append(newLi);
                fetch(pokeUrl)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        console.log(data.sprites.front_default);
                        let newImg = document.createElement('img');
                        newImg.setAttribute("src", data.sprites.front_default);
                        newLi.append(newImg)
                    });
            }

        });
}
// pokemon(pokeApi);
// searchButton.addEventListener('click', pokemon);
var pokemonList = $('.pokemon-list-parent');

pokemonList.on('click', '.pokemon-list', function (event) {
    let pokeName = event.target.textContent;
    let pokeApi2 = "https://pokeapi.co/api/v2/pokemon/" + pokeName;

    console.log(pokeApi2)

    fetch(pokeApi2)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            pokemonList.css('display', 'none');
            console.log(data);
            let newDiv = document.createElement('div');
            newDiv.setAttribute('class', 'single-poke-info');
            pokeInfoMain.append(newDiv);
            let newUl = document.createElement('ul');
            newUl.setAttribute("class", "single-poke-info")
            newDiv.append(newUl);
            let newLi1 = document.createElement('li');
            let newLi2 = document.createElement('li');
            let newLi3 = document.createElement('li');
            let newLi4 = document.createElement('li');
            let newLi5 = document.createElement('li');

            newLi2.textContent = data.name;
            console.log(data.types.length);
            if (data.types.length === 2) {
                newLi3.textContent = "Type: " + data.types[0].type.name + " / " + data.types[1].type.name;
            } else {
                newLi3.textContent = "Type: " + data.types[0].type.name;
            }

            newLi4.textContent = "Ability: " + data.abilities[0].ability.name + " / " + data.abilities[1].ability.name;
            for (let i = 0; i < data.stats.length; i++) {
                let newDivStat = document.createElement('div');
                newDivStat.textContent = data.stats[i].stat.name + ": " + data.stats[i].base_stat;
                newLi5.append(newDivStat);
            }
            let newImg = document.createElement('img');
            newImg.setAttribute('src', data.sprites.front_default)
            newImg.setAttribute("style", "width:150px; height:150px;")
            newLi1.append(newImg);
            newUl.append(newLi1);
            newUl.append(newLi2);
            newUl.append(newLi3);
            newUl.append(newLi4);
            newUl.append(newLi5);
        });

});


let claerInput = document.querySelector('.clear-input');
claerInput.addEventListener('click', function () {
    letterOnSearch.value = '';
    $(".single-poke-info").css('display', 'none');
    pokemonList.css('display', 'block');

});




searchButton.addEventListener('click', function () {
    let searchVal = letterOnSearch.value.toLowerCase();
    let pokeApi2 = "https://pokeapi.co/api/v2/pokemon/" + searchVal;

    console.log(pokeApi2)

    fetch(pokeApi2)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            pokemonList.css('display', 'none');
            console.log(data);
            let newDiv = document.createElement('div');
            newDiv.setAttribute('class', 'single-poke-info');
            pokeInfoMain.append(newDiv);
            let newUl = document.createElement('ul');
            newUl.setAttribute("class", "single-poke-info")
            newDiv.append(newUl);
            let newLi1 = document.createElement('li');
            let newLi2 = document.createElement('li');
            let newLi3 = document.createElement('li');
            let newLi4 = document.createElement('li');
            let newLi5 = document.createElement('li');

            newLi2.textContent = data.name;
            console.log(data.types.length);
            if (data.types.length === 2) {
                newLi3.textContent = "Type: " + data.types[0].type.name + " / " + data.types[1].type.name;
            } else {
                newLi3.textContent = "Type: " + data.types[0].type.name;
            }

            newLi4.textContent = "Ability: " + data.abilities[0].ability.name + " / " + data.abilities[1].ability.name;
            for (let i = 0; i < data.stats.length; i++) {
                let newDivStat = document.createElement('div');
                newDivStat.textContent = data.stats[i].stat.name + ": " + data.stats[i].base_stat;
                newLi5.append(newDivStat);
            }
            let newImg = document.createElement('img');
            newImg.setAttribute('src', data.sprites.front_default)
            newImg.setAttribute("style", "width:150px; height:150px;")
            newLi1.append(newImg);
            newUl.append(newLi1);
            newUl.append(newLi2);
            newUl.append(newLi3);
            newUl.append(newLi4);
            newUl.append(newLi5);
        });

});

let arrowLeft = document.querySelector('.button-1');
let arrowUp = document.querySelector('.button-2');
let arrowRight = document.querySelector('.button-3');
let arrowDown = document.querySelector('.button-4');

arrowDown.addEventListener('click', function () {
    pokeInfoMain.scrollBy({
        top: 100,
        behavior: "smooth"
    });
});

arrowUp.addEventListener('click', function () {
    pokeInfoMain.scrollBy({
        top: -100,
        behavior: "smooth"
    });
});


let gen1Light = document.querySelector('.image-light-1');
let gen2Light = document.querySelector('.image-light-2');
let gen3Light = document.querySelector('.image-light-3');
let gen4Light = document.querySelector('.image-light-4');
let gen5Light = document.querySelector('.image-light-5');
let gen6Light = document.querySelector('.image-light-6');
let gen7Light = document.querySelector('.image-light-7');
let gen8Light = document.querySelector('.image-light-8');
let gen9Light = document.querySelector('.image-light-9');
let count = 0;
let pokeApiGen;
if (count === 0) {
    pokemon(pokeApi);
    gen1Light.setAttribute('style', 'background-color:lightgreen')
    gen2Light.setAttribute('style', 'background-color:red')
    gen3Light.setAttribute('style', 'background-color:red')
    gen4Light.setAttribute('style', 'background-color:red')
    gen5Light.setAttribute('style', 'background-color:red')
    gen6Light.setAttribute('style', 'background-color:red')
    gen7Light.setAttribute('style', 'background-color:red')
    gen8Light.setAttribute('style', 'background-color:red')
    gen9Light.setAttribute('style', 'background-color:red')
}


arrowRight.addEventListener('click', function () {


    count++;
    console.log(count)
    if (count === 1) {
        pokemonList.empty();
        pokeApiGen = "https://pokeapi.co/api/v2/pokemon/?limit=99&offset=151";
        pokemon(pokeApiGen);
        gen1Light.setAttribute('style', 'background-color:red')
        gen2Light.setAttribute('style', 'background-color:lightgreen')
        gen3Light.setAttribute('style', 'background-color:red')
        gen4Light.setAttribute('style', 'background-color:red')
        gen5Light.setAttribute('style', 'background-color:red')
        gen6Light.setAttribute('style', 'background-color:red')
        gen7Light.setAttribute('style', 'background-color:red')
        gen8Light.setAttribute('style', 'background-color:red')
        gen9Light.setAttribute('style', 'background-color:red')

    } else if (count === 2) {
        pokemonList.empty();
        pokeApiGen = "https://pokeapi.co/api/v2/pokemon/?limit=135&offset=251";
        pokemon(pokeApiGen);
        gen1Light.setAttribute('style', 'background-color:red')
        gen2Light.setAttribute('style', 'background-color:red')
        gen3Light.setAttribute('style', 'background-color:lightgreen')
        gen4Light.setAttribute('style', 'background-color:red')
        gen5Light.setAttribute('style', 'background-color:red')
        gen6Light.setAttribute('style', 'background-color:red')
        gen7Light.setAttribute('style', 'background-color:red')
        gen8Light.setAttribute('style', 'background-color:red')
        gen9Light.setAttribute('style', 'background-color:red')
    } else if (count === 3) {
        pokemonList.empty();
        pokeApiGen = "https://pokeapi.co/api/v2/pokemon/?limit=108&offset=386";
        pokemon(pokeApiGen);
        gen1Light.setAttribute('style', 'background-color:red')
        gen2Light.setAttribute('style', 'background-color:red')
        gen3Light.setAttribute('style', 'background-color:red')
        gen4Light.setAttribute('style', 'background-color:lightgreen')
        gen5Light.setAttribute('style', 'background-color:red')
        gen6Light.setAttribute('style', 'background-color:red')
        gen7Light.setAttribute('style', 'background-color:red')
        gen8Light.setAttribute('style', 'background-color:red')
        gen9Light.setAttribute('style', 'background-color:red')
    } else if (count === 4) {
        pokemonList.empty();
        pokeApiGen = "https://pokeapi.co/api/v2/pokemon/?limit=156&offset=494";
        pokemon(pokeApiGen);
        gen1Light.setAttribute('style', 'background-color:red')
        gen2Light.setAttribute('style', 'background-color:red')
        gen3Light.setAttribute('style', 'background-color:red')
        gen4Light.setAttribute('style', 'background-color:red')
        gen5Light.setAttribute('style', 'background-color:lightgreen')
        gen6Light.setAttribute('style', 'background-color:red')
        gen7Light.setAttribute('style', 'background-color:red')
        gen8Light.setAttribute('style', 'background-color:red')
        gen9Light.setAttribute('style', 'background-color:red')
    } else if (count === 5) {
        pokemonList.empty();
        pokeApiGen = "https://pokeapi.co/api/v2/pokemon/?limit=72&offset=649";
        pokemon(pokeApiGen);
        gen1Light.setAttribute('style', 'background-color:red')
        gen2Light.setAttribute('style', 'background-color:red')
        gen3Light.setAttribute('style', 'background-color:red')
        gen4Light.setAttribute('style', 'background-color:red')
        gen5Light.setAttribute('style', 'background-color:red')
        gen6Light.setAttribute('style', 'background-color:lightgreen')
        gen7Light.setAttribute('style', 'background-color:red')
        gen8Light.setAttribute('style', 'background-color:red')
        gen9Light.setAttribute('style', 'background-color:red')
    } else if (count === 6) {
        pokemonList.empty();
        pokeApiGen = "https://pokeapi.co/api/v2/pokemon/?limit=88&offset=721";
        pokemon(pokeApiGen);
        gen1Light.setAttribute('style', 'background-color:red')
        gen2Light.setAttribute('style', 'background-color:red')
        gen3Light.setAttribute('style', 'background-color:red')
        gen4Light.setAttribute('style', 'background-color:red')
        gen5Light.setAttribute('style', 'background-color:red')
        gen6Light.setAttribute('style', 'background-color:red')
        gen7Light.setAttribute('style', 'background-color:lightgreen')
        gen8Light.setAttribute('style', 'background-color:red')
        gen9Light.setAttribute('style', 'background-color:red')
    } else if (count === 7) {
        pokemonList.empty();
        pokeApiGen = "https://pokeapi.co/api/v2/pokemon/?limit=96&offset=809";
        pokemon(pokeApiGen);
        gen1Light.setAttribute('style', 'background-color:red')
        gen2Light.setAttribute('style', 'background-color:red')
        gen3Light.setAttribute('style', 'background-color:red')
        gen4Light.setAttribute('style', 'background-color:red')
        gen5Light.setAttribute('style', 'background-color:red')
        gen6Light.setAttribute('style', 'background-color:red')
        gen7Light.setAttribute('style', 'background-color:red')
        gen8Light.setAttribute('style', 'background-color:lightgreen')
        gen9Light.setAttribute('style', 'background-color:red')
    } else if (count === 8) {
        pokemonList.empty();
        pokeApiGen = "https://pokeapi.co/api/v2/pokemon/?limit=110&offset=905";
        pokemon(pokeApiGen);
        gen1Light.setAttribute('style', 'background-color:red')
        gen2Light.setAttribute('style', 'background-color:red')
        gen3Light.setAttribute('style', 'background-color:red')
        gen4Light.setAttribute('style', 'background-color:red')
        gen5Light.setAttribute('style', 'background-color:red')
        gen6Light.setAttribute('style', 'background-color:red')
        gen7Light.setAttribute('style', 'background-color:red')
        gen8Light.setAttribute('style', 'background-color:red')
        gen9Light.setAttribute('style', 'background-color:lightgreen')
    } else {
        count = 8
    }

});


arrowLeft.addEventListener('click', function () {


    count--;
    console.log(count)
    if (count === 0) {
        pokemonList.empty();
        pokemon(pokeApi);
        gen1Light.setAttribute('style', 'background-color:lightgreen')
        gen2Light.setAttribute('style', 'background-color:red')
        gen3Light.setAttribute('style', 'background-color:red')
        gen4Light.setAttribute('style', 'background-color:red')
        gen5Light.setAttribute('style', 'background-color:red')
        gen6Light.setAttribute('style', 'background-color:red')
        gen7Light.setAttribute('style', 'background-color:red')
        gen8Light.setAttribute('style', 'background-color:red')
        gen9Light.setAttribute('style', 'background-color:red')
    } else if (count === 1) {
        pokemonList.empty();
        pokeApiGen = "https://pokeapi.co/api/v2/pokemon/?limit=99&offset=151";
        pokemon(pokeApiGen);
        gen1Light.setAttribute('style', 'background-color:red')
        gen2Light.setAttribute('style', 'background-color:lightgreen')
        gen3Light.setAttribute('style', 'background-color:red')
        gen4Light.setAttribute('style', 'background-color:red')
        gen5Light.setAttribute('style', 'background-color:red')
        gen6Light.setAttribute('style', 'background-color:red')
        gen7Light.setAttribute('style', 'background-color:red')
        gen8Light.setAttribute('style', 'background-color:red')
        gen9Light.setAttribute('style', 'background-color:red')
    } else if (count === 2) {
        pokemonList.empty();
        pokeApiGen = "https://pokeapi.co/api/v2/pokemon/?limit=135&offset=251";
        pokemon(pokeApiGen);
        gen1Light.setAttribute('style', 'background-color:red')
        gen2Light.setAttribute('style', 'background-color:red')
        gen3Light.setAttribute('style', 'background-color:lightgreen')
        gen4Light.setAttribute('style', 'background-color:red')
        gen5Light.setAttribute('style', 'background-color:red')
        gen6Light.setAttribute('style', 'background-color:red')
        gen7Light.setAttribute('style', 'background-color:red')
        gen8Light.setAttribute('style', 'background-color:red')
        gen9Light.setAttribute('style', 'background-color:red')
    } else if (count === 3) {
        pokemonList.empty();
        pokeApiGen = "https://pokeapi.co/api/v2/pokemon/?limit=108&offset=386";
        pokemon(pokeApiGen);
        gen1Light.setAttribute('style', 'background-color:red')
        gen2Light.setAttribute('style', 'background-color:red')
        gen3Light.setAttribute('style', 'background-color:red')
        gen4Light.setAttribute('style', 'background-color:lightgreen')
        gen5Light.setAttribute('style', 'background-color:red')
        gen6Light.setAttribute('style', 'background-color:red')
        gen7Light.setAttribute('style', 'background-color:red')
        gen8Light.setAttribute('style', 'background-color:red')
        gen9Light.setAttribute('style', 'background-color:red')
    } else if (count === 4) {
        pokemonList.empty();
        pokeApiGen = "https://pokeapi.co/api/v2/pokemon/?limit=156&offset=494";
        pokemon(pokeApiGen);
        gen1Light.setAttribute('style', 'background-color:red')
        gen2Light.setAttribute('style', 'background-color:red')
        gen3Light.setAttribute('style', 'background-color:red')
        gen4Light.setAttribute('style', 'background-color:red')
        gen5Light.setAttribute('style', 'background-color:lightgreen')
        gen6Light.setAttribute('style', 'background-color:red')
        gen7Light.setAttribute('style', 'background-color:red')
        gen8Light.setAttribute('style', 'background-color:red')
        gen9Light.setAttribute('style', 'background-color:red')
    } else if (count === 5) {
        pokemonList.empty();
        pokeApiGen = "https://pokeapi.co/api/v2/pokemon/?limit=72&offset=649";
        pokemon(pokeApiGen);
        gen1Light.setAttribute('style', 'background-color:red')
        gen2Light.setAttribute('style', 'background-color:red')
        gen3Light.setAttribute('style', 'background-color:red')
        gen4Light.setAttribute('style', 'background-color:red')
        gen5Light.setAttribute('style', 'background-color:red')
        gen6Light.setAttribute('style', 'background-color:lightgreen')
        gen7Light.setAttribute('style', 'background-color:red')
        gen8Light.setAttribute('style', 'background-color:red')
        gen9Light.setAttribute('style', 'background-color:red')
    } else if (count === 6) {
        pokemonList.empty();
        pokeApiGen = "https://pokeapi.co/api/v2/pokemon/?limit=88&offset=721";
        pokemon(pokeApiGen);
        gen1Light.setAttribute('style', 'background-color:red')
        gen2Light.setAttribute('style', 'background-color:red')
        gen3Light.setAttribute('style', 'background-color:red')
        gen4Light.setAttribute('style', 'background-color:red')
        gen5Light.setAttribute('style', 'background-color:red')
        gen6Light.setAttribute('style', 'background-color:red')
        gen7Light.setAttribute('style', 'background-color:lightgreen')
        gen8Light.setAttribute('style', 'background-color:red')
        gen9Light.setAttribute('style', 'background-color:red')
    } else if (count === 7) {
        pokemonList.empty();
        pokeApiGen = "https://pokeapi.co/api/v2/pokemon/?limit=96&offset=809";
        pokemon(pokeApiGen);
        gen1Light.setAttribute('style', 'background-color:red')
        gen2Light.setAttribute('style', 'background-color:red')
        gen3Light.setAttribute('style', 'background-color:red')
        gen4Light.setAttribute('style', 'background-color:red')
        gen5Light.setAttribute('style', 'background-color:red')
        gen6Light.setAttribute('style', 'background-color:red')
        gen7Light.setAttribute('style', 'background-color:red')
        gen8Light.setAttribute('style', 'background-color:lightgreen')
        gen9Light.setAttribute('style', 'background-color:red')
    } else if (count === 8) {
        pokemonList.empty();
        pokeApiGen = "https://pokeapi.co/api/v2/pokemon/?limit=110&offset=905";
        pokemon(pokeApiGen);
        gen1Light.setAttribute('style', 'background-color:red')
        gen2Light.setAttribute('style', 'background-color:red')
        gen3Light.setAttribute('style', 'background-color:red')
        gen4Light.setAttribute('style', 'background-color:red')
        gen5Light.setAttribute('style', 'background-color:red')
        gen6Light.setAttribute('style', 'background-color:red')
        gen7Light.setAttribute('style', 'background-color:red')
        gen8Light.setAttribute('style', 'background-color:red')
        gen9Light.setAttribute('style', 'background-color:lightgreen')
    } else {
        count = 0;
    }

});

