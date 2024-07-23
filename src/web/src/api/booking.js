import { axiosHandler } from '../utils/index';
import { createBooking } from '../redux/events';

export const registerBooking = data => async (dispatch, getState) => {
  //Hit register booking api route
  try {
    const state = getState();
    const json = await axiosHandler({
      url: `events/${data?.id}`,
      data,
      method: 'POST',
      state,
    });

    //Once booking is received, add it to state
    await dispatch(createBooking(json.data));
  } catch (error) {
    console.log(error);
    throw error;
  }
};
