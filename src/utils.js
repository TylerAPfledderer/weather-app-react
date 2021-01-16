import axios from "axios";

/**
 * Function to run API call and set state with the returned data.
 * @param {String} url - the API Url
 * @param {Function} stateFunc - function created from a useState()
 */
export async function fetchData(url, stateFunc) {
    try {
        await axios.get(url).then((data) => stateFunc(data.data));
    } catch (err) {
        console.error(err.message);
    }
}