const URL = 'https://restcountries.com/v3.1/name/';
const fields = 'fields = name,capital,population,flags,languages';

// export function fetchCountries(name) {
//   return fetch(`${URL}${name}?${fields}`)
//     .then(response => response.json())
//     .catch(error => console.log(error));
// }

export function fetchCountries(name) {
  return fetch(`${URL}${name}?${fields}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => console.log(error));
}
