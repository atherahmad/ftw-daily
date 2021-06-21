// ================ Action types ================ //
export const LANDING_INCREMENT_SECTION = 'app/LandingPage/add';
export const LANDING_DECREMENT_SECTION = 'app/LandingPage/remove';
export const LANDING_FIND_SECTION = 'app/LandingPage/get';
// ================ Reducer ================ //
const initialState = {
  section: 0,
};

const landingPageReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case LANDING_INCREMENT_SECTION:
      return {
        section: state.section + 1,
      };
    case LANDING_DECREMENT_SECTION:
      return {
        section: state.section - 1,
      };
    case LANDING_FIND_SECTION:
      return state.section;

      break;

    default:
      return initialState;
      break;
  }
};

export default landingPageReducer;
// ================ Action creators ================ //
export const landingPageIncrement = () => ({
  type: LANDING_INCREMENT_SECTION,
});
export const landingPageDecrement = () => ({
  type: LANDING_DECREMENT_SECTION,
});
export const landingPageFind = () => ({
  type: LANDING_FIND_SECTION,
});
