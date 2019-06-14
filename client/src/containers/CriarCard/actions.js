import axios from 'axios';

import { CREATE_CARD_LOADING, CREATE_CARD_SUCCESS, CREATE_CARD_FAILURE } from './actionTypes';

export const createCard = (data, history) => (dispatch) => {
  dispatch({ type: CREATE_CARD_LOADING });

  axios
    .post('/api/cards/register', data, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then((response) => {
      dispatch({ type: CREATE_CARD_SUCCESS });

      // console.log(response.data);

      history.push('/');
    })
    .catch((error) => {
      console.log(error.response);

      dispatch({
        type: CREATE_CARD_FAILURE,
        payload: error.response.data.errors,
      });
    });
};
