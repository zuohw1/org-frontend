import fetch from 'dva/fetch';
import JsonBig from 'json-bigint';
import history from './history';
import Configuration from '../env.config';

function parseJSON(response) {
  // return response.json();
  return response.text().then(JsonBig.parse);
}
/**
 * Pre check http status.
 *
 * @param {object}  response  A response of http request
 */
function checkStatus(response) {
  const [resolved, raw] = response;
  if ((raw.status >= 200 && raw.status < 300) || raw.status === 404) {
    return resolved;
  }
  if (raw.status === 401) {
    window.sessionStorage.clear();
    history.push('/login');
    throw new Error('请登录');
  } else {
    throw new Error(resolved ? resolved.msg : raw.statusText);
  }
}

function generateUrl(url) {
  return `${Configuration.api}/${url}`;
}

function toJson(raw) {
  let resolved = null;
  if (raw.status !== 404) {
    resolved = parseJSON(raw);
  }
  return Promise.all([resolved, raw]);
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
function genreateRequest(url, options) {
  return fetch(generateUrl(url), options)
    .then(toJson)
    .then(checkStatus);
}

/**
 * Generate the header of request
 *
 * @param  {string} method   The Methon of http
 * @return {object}          A http request header
 */
function genrateRequestHeader(method) {
  const header = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    Object.assign(header.headers, {
      'x-business-group': 101,
      'x-token-code': 'xjMjL0m2A6d1mOIsb9uFk+wuBIcKxrg4',
    });
  } catch (e) {
    return header;
  }
  return header;
}

const Request = {
  post(url, data) {
    const body = JsonBig.stringify(data);
    return genreateRequest(url, { ...genrateRequestHeader('POST'), body });
  },
  patch(url, data) {
    const body = JsonBig.stringify(data);
    return genreateRequest(url, { ...genrateRequestHeader('PATCH'), body });
  },
  put(url, data) {
    const body = JsonBig.stringify(data);
    return genreateRequest(url, { ...genrateRequestHeader('put'), body });
  },
  get(url) {
    return genreateRequest(url, { ...genrateRequestHeader('GET') });
  },
  delete(url) {
    return genreateRequest(url, { ...genrateRequestHeader('DELETE') });
  },
};

export default Request;
