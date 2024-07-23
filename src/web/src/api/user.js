import { axiosHandler } from '../utils/index';
import { createUser } from '../redux/user';

export const registerUser = data => async (dispatch, getState) => {
  //Create new user

  try {
    const state = getState();
    const json = await axiosHandler({
      url: 'user',
      data,
      method: 'POST',
      state,
    });
    await dispatch(createUser(json.data));
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//Add login, logout, and separate routes for admin user
