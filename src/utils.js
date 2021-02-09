import axios from 'axios';

/**
 * Function to simplify the process of formatting a Date instance
 * @param {number | Date} date The Date object (What's passed to the 'format()' method)
 * @param {Object} options Option for formatting, passed in as an object
 * @returns {string | Error} Returns either thrown error or the formatted date
 */
export const dateFormat = (date, options) => {
  try {
    const err = new Error();

    if (typeof date !== 'object' && typeof date !== 'number') {
      err.message =
        'Date param must be the Date object or a number in dateFormat function';
      throw err;
    }

    if (typeof options !== 'object') {
      err.message =
        'Options param must be an object of valid key/values in dateFormat function';
      throw err;
    }

    return new Intl.DateTimeFormat('en-US', options).format(date);
  } catch (error) {
    console.error(error);
  }
};

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

export function isToday(date) {
  let thisDate;
  if (date instanceof Date) {
    thisDate = date.getDate();
  }

  return thisDate === new Date().getDate();
}

export function isTomorrow(date) {
  let thisDate;
  if (date instanceof Date) {
    thisDate = date.getDate();
  }

  return thisDate === new Date().getDate() + 1;
}
