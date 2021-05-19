'use strict';

import axios from 'axios';
import config from '../../config';
const API_URL = process.env.API_URL || config.api_url;

axios.create({
  baseURL: API_URL || '',
  method: 'get',
  timeout: 10000,
  responseEncoding: 'utf8',
  headers: { 'client-version': '1.0.0' }
});

axios.defaults.headers.post['Content-Type'] = 'application/json';

// axios.defaults.withCredentials = true;

const getUrl = (url) => {
  if (url.indexOf('http://') === 0 || url.indexOf('https://') === 0) {
    return url;
  }
  return url.indexOf('/') === 0 ? API_URL + url : '/' + url;
};

export const Get = async (url, params = {}, option) => {
  const results = await axios.get(getUrl(url), { params }, option);
  return results.data;
};

export const Post = async (url, params = {}, option) => {
  const results = await axios.post(getUrl(url), params, option);
  return results.data;
};

export const Put = async (url, params = {}, option) => {
  const results = await axios.put(getUrl(url), params, option);
  return results.data;
};

export const Patch = async (url, params = {}, option) => {
  const results = await axios.patch(getUrl(url), params, option);
  return results.data;
};

export const Delete = async (url, option) => {
  const results = await axios.delete(getUrl(url), option);
  return results.data;
};
