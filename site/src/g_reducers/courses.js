export const initialState = {
  categories: null,
  currentCourse: null,
  courses: null,
  checkoutData: null,
  purchaseCourse: null,
};

const course = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CATEGORIES':
      return {
        ...state,
        categories: (state.categories = action.payload),
      };
    case 'GET_CURRENT_COURSE':
      return {
        ...state,
        currentCourse: action.payload,
      };
    case 'GET_ALL_COURSES':
      return {
        ...state,
        courses: action.payload,
      };
      case 'CHECKOUT':
      return {
        ...state,
        checkoutData: action.payload,
      };
      case 'PURCHASE_COURSE':
      return {
        ...state,
        purchaseCourse: action.payload,
      };
    default:
      return state;
  }
};

export default course;
