import './css/styles.css';
import debounce from 'lodash.debounce';
// import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  info: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput() {
  const name = refs.input.value.trim();
  if (name === '') {
    return (refs.list.innerHTML = ''), (refs.info.innerHTML = '');
  }

  fetchCountries(name)
    .then(countries => {
      refs.list.innerHTML = '';
      refs.info.innerHTML = '';
      if (countries.length === 1) {
        refs.list.insertAdjacentHTML('beforeend', renderList(countries));
        refs.info.insertAdjacentHTML('beforeend', renderInfo(countries));
      } else if (countries.length >= 10) {
        alertTooManyMatches();
      } else {
        refs.list.insertAdjacentHTML('beforeend', renderList(countries));
      }
    })
    .catch(alertWrongName);
}

function renderList(countries) {
  const markupList = countries
    .map(({ name, flags }) => {
      return `<li class="country-list__item">
    <img class="country-list__flag" src="${flags.svg}" alt="flag of ${name.official}" width=30px height=30px>
    <h2 class="country-list__name">${name.official}</h2>
    </li>
    `;
    })
    .join('');
  return markupList;
}

function renderInfo(countries) {
  const markupInfo = countries
    .map(({ capital, population, languages }) => {
      return `<ul class="country-info__list">
                <li class="country-info__item">
                <h3 class="country-info__text"> Capital: ${capital}</h3></li>
                <li class="country-info__item">
                <h3 class="country-info__text"> Population: ${population}</h3></li>   
                <li class="country-info__item">
                <h3 class="country-info__text"> Languages: ${Object.values(
                  languages
                ).join(', ')}</h3></li>
    </ul>
    `;
    })
    .join('');
  return markupInfo;
}

function alertWrongName() {
  Notify.failure('Oops, there is no country with that name');
}

function alertTooManyMatches() {
  Notify.info('Too many matches found. Please enter a more specific name');
}
