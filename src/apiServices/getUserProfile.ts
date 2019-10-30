import axios from 'axios';

/**
 * Dummy Test API to fetch userProfile
 */
export function getUserProfile() {
  return axios
    .get('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.data)
    .catch(err => console.error(err));
}
