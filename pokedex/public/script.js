let pokemonArray = [];
let currentNames = pokemonArray;

async function init() {
  let main = document.getElementById("mainBody");
  main.innerHTML = "";
  showLoadingSpinner();
  await getData();
  await renderMain();
  disableLoadingSpinner();
}

async function getData() {
  let response = await fetch(
    "https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0"
  );
  let responseToJson = await response.json();
  let pokemons = responseToJson.results;

  for (let i = 0; i < pokemons.length; i++) {
    let pDetails = await fetch(pokemons[i].url);
    let pData = await pDetails.json();
    pokemonArray.push(pData);
  }
}

function renderMain() {
  let main = document.getElementById("mainBody");
  main.innerHTML = "";
  for (let i = 0; i < currentNames.length; i++) {
    main.innerHTML += generateMainHtml(i);
  }
  generateButton(pokemonArray.length);
}

function generateButton(offset) {
  let section = document.getElementById("button");
  section.innerHTML = "";
  section.innerHTML = `<button onclick="loadMore(${offset})">Load More</button>`;
}

function renderDetailCard(i) {
  let mCard = document.getElementById("mainCard");
  mCard.innerHTML = "";
  mCard.innerHTML = generateDetailHtml(i);
  document.getElementById("mainCard").classList.remove("none");
  document.getElementById("body").classList.add("overflow");
}

function ifVaild(extract) {
  if (extract.length < 2) {
    return "";
  } else {
    return `${extract[1].ability.name}`;
  }
}

function closeMainCard() {
  document.getElementById("mainCard").classList.add("none");
  document.getElementById("body").classList.remove("overflow");
}

async function loadMore(offset) {
  showLoadingSpinner();
  let response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${offset}`);
  let responseToJson = await response.json();
  let pokemons = responseToJson.results;
  for (let i = 0; i < pokemons.length; i++) {
    let pDetails = await fetch(pokemons[i].url);
    let pData = await pDetails.json();
    pokemonArray.push(pData);
  }
  filterPokemon();
  disableLoadingSpinner();
  renderMain(offset + 20);
}

function showLoadingSpinner() {
  document.getElementById("spinner").classList.remove("none");
}

function disableLoadingSpinner() {
  document.getElementById("spinner").classList.add("none");
}

function previousNext(i) {
  if (i < 0) {
    renderDetailCard(pokemonArray.length-1);
  } else if (i >= pokemonArray.length) {
    renderDetailCard(0);
  } else {
    renderDetailCard(i);
  }
}

function filterPokemon() {
  let filterWord = document.getElementById("filter").value.toLowerCase();
  currentNames = pokemonArray.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(filterWord)
  );
  renderMain();
}