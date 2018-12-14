import fetch from 'dva/fetch';
import Cookies from 'js-cookie';
import JsonBig from 'json-bigint';
import Configuration from '../env.config';

function parseJSON(response) {
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
    window.localStorage.clear();
    throw new Error('请登录');
  } else if (raw.status === 403) {
    throw new Error('你不能进行此操作!');
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
    // credentials: 'include',
  };
  const functionId = Cookies.get('x-function-id');
  if (functionId) {
    Object.assign(header.headers, {
      'X-Function-Id': functionId,
    });
  }
  if (Configuration.debug) {
    Object.assign(header.headers, {
      'X-Person-Id': 2,
      'X-Org-Id': 37838,
      'X-Roles': '',
      'X-Data-Permission': '[{"id":"1072821543177232385","pdType":1,"include":1,"pdMain":"0","pdValue":"37838","pdContain":"1","slaveList":[]}]',
      'X-Business-Group-Id': 101,
    });
  }
  try {
    Object.assign(header.headers, {
      Authorization: Configuration.debug ? 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJjbGFpbSIsImJ1c2luZXNzR3JvdXBJZCI6IjEwMSIsImxvZ2luTmFtZSI6Imdhb3pob25nbWluZyIsImlzcyI6IlNlcnZpY2UiLCJwZXJzb25JZCI6IjIwMTg5NCIsInVzZXJOYW1lIjoi6auY5Luy5piOIiwiZXhwIjoxNTQ2NjAxMTQzLCJpYXQiOjE1NDM5MjI3NDMsIm9yZ0lkIjoiMjQzMTgiLCJlbXBsb3llZU51bWJlciI6IjAwMDI0ODMifQ.hhTTGwJhmARHRPMU0B_PXeDfeW7MEj2xRcDvHzQYGWw' : `Bearer ${Cookies.get('token')}`,
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
