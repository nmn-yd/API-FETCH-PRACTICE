'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const propertyValuesLanguages = Object.values(data.languages);
  const propertyValuesCurrencies = Object.values(data.currencies);

  const lang =
    propertyValuesLanguages.length === 1
      ? propertyValuesLanguages[0]
      : propertyValuesLanguages[1];

  const html = `<article class="country ${className}  ">
  <img class="country__img" src="${data.flags.svg}" />
  <div class="country__data">
    <h3 class="country__name">${data.name.common}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)} Million people</p>
    <p class="country__row"><span>🗣️</span>${lang}</p>
    <p class="country__row"><span>💰</span>${
      propertyValuesCurrencies[0].name
    }</p>
  </div>
</article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function (con) {
  const geoPos = await getPosition();

  // reverse geocoding
  const { latitude: lat, longitude: lon } = geoPos.coords;
  const getMeLoc = await fetch(`https://geocode.xyz/${lat},${lon}?geoit=json`);
  const getmeCon = await getMeLoc.json();

  console.log(getmeCon);
  console.log(getmeCon.country);

  const res = await fetch(
    `https://restcountries.com/v3.1/name/${getmeCon.country}`
  );
  const data = await res.json();

  renderCountry(data[0]);
};

btn.addEventListener('click', function () {
  whereAmI('india');
});
