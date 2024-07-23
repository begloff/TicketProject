// Actions
const CREATE_EVENT = 'admin/CREATE_EVENT';
const LOAD_EVENTS = 'user/LOAD_EVENTS';
const CREATE_BOOKING = 'user/CREATE_BOOKING';

// Reducer
const initialState = {
  data: [],
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CREATE_EVENT:
      return { ...state, data: [...state.data, action.event] };
    case LOAD_EVENTS:
      return { ...state, data: action.events };
    case CREATE_BOOKING: {
      //Aggregate all bookings into correct event
      const updatedEvents = state.data.map(event => {
        if (event.id === action.booking.eventId) {
          return {
            ...event,
            bookings: [...event.bookings, action.booking],
          };
        }
        return event;
      });
      return { ...state, data: updatedEvents };
    }
    default:
      return state;
  }
}

// Action Creators
export function createEvent(event) {
  return { type: CREATE_EVENT, event };
}

export function loadEvents(events) {
  return { type: LOAD_EVENTS, events };
}

export function createBooking(booking) {
  return { type: CREATE_BOOKING, booking };
}
