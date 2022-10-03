import axios from 'axios';
import Constants from '../constants';

export const sendPush = async (token: string) => {
  try {
    const url: string = `${Constants.API_URL}`;
    var bodyFormData = new FormData();
    bodyFormData.append('token', token);
    const {data: response} = await axios({
      method: 'post',
      url: url,
      data: bodyFormData,
      headers: {'Content-Type': 'multipart/form-data'},
    });
    console.debug(response);
    return response;
  } catch (error) {
    throw `Error while sending notification: ${error}`;
  }
};
