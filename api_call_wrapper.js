class Api_call_wrapper {
  /**
   * Wrapper function for making API calls using the fetch API
   * @param {string} url
   * @param {string} method
   * @param {Object} body
   * @returns {Promise} A promise that resolves to the API response
   */
  static async api_call(url, method, body) {
    const requestOptions = {
      method: method,
      // headers: {
      //   'Content-Type': 'application/json'
      // }
    };

    if (body) {
      requestOptions.body = JSON.stringify(body);
    }

    const response = await fetch(url, requestOptions);

    if (response.ok) {
      return response.json();
    } else if (method === 'POST' && response.status === 422) {
      const error = await response.json();
      return Promise.reject(error);
    } else {
      const error = new Error(`${response.status} (${response.statusText})`);
      return Promise.reject(error);
    }
  }
}
//
export {Api_call_wrapper}