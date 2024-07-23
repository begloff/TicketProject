import { axiosHandler } from '../utils/index';
import { createEvent, loadEvents } from '../redux/events';

export const registerEvent = data => async (dispatch, getState) => {
  try {
    const state = getState();

    //hit createEvent api route
    const json = await axiosHandler({
      url: 'admin/events',
      data,
      method: 'POST',
      state,
    });

    //Add new event to state
    await dispatch(createEvent(json.data));
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchEvents = () => async (dispatch, getState) => {
  //get all events (with bookings)
  try {
    const state = getState();
    const json = await axiosHandler({
      url: 'events',
      state,
    });
    await dispatch(loadEvents(json.data));
  } catch (error) {
    console.log(error);
    throw error;
  }
};
