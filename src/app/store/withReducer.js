import { injectReducer } from 'app/store/index';

const withReducer = (key, reducer) => (WrappedComponent) => {
  injectReducer(key, reducer);

  return (props) => <WrappedComponent {...props} />;
};
// reducers.js
export const changeFormReducer = (state = initialState.changeForm, action) => { // اصلاح reducer برای changeForm
  switch (action.type) {
    case 'SET_CHANGE_FORM':
      return action.payload;
    default:
      return state;
  }
};
export default withReducer;
