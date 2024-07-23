import axios from 'axios';
import { API_URL } from './constants';

//Abstracted axios supply method, data, and url
export const axiosHandler = async ({
  url,
  params,
  method = 'GET',
  data,
  state,
  headers,
}) => {
  if (!url) throw Error('NO_URL_SPECIFIED');
  if (!method) throw Error('NO_METHOD_SPECIFIED');
  const baseURL = API_URL;
  const options = {
    url,
    baseURL,
    method,
    params,
    data,
    headers,
    crossDomain: true,
  };

  //Implement auth token(bearer) if necessary for routes updating state
  try {
    const res = await axios(options);
    return res.data;
  } catch (error) {
    throw Error(error?.response?.data?.error || error);
  }
};

export const lowerFirstLetter = string => {
  return string?.charAt(0)?.toLowerCase() + string?.slice(1);
};

export const formatDate = dateString => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', options);
};
