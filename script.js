const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities = [];

// fetch returns a promise of raw data then text converted to json & data array with ES6 spread operator.
fetch(endpoint)
  .then(text => text.json())
  .then(data => cities.push(...data));

// match search string with city or state name.
function findMatches(wordToMatch, cities) {
  return cities.filter(place => {
  
    const regex = new RegExp(wordToMatch, 'gi');
    return place.city.match(regex) || place.state.match(regex)
  });
}

// Add comas to population numbers
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches() {
  const matchArray = findMatches(this.value, cities);
  const html = matchArray.map(place => {
    const regex = new RegExp(this.value, 'gi');
    const cityName = place.city.replace(regex, `<span class="h1">${this.value}`);
    const stateName = place.state.replace(regex, `<span class="h1">${this.value}`);
    return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
      </li>
    `;
  }).join(''); //multiple array items to string
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions= document.querySelector('.suggestions');

// run displayMatches function each time there is a change in the user input or a key is pressed.
searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
