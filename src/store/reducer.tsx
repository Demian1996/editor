import Immutable from 'immutable';

const initState = Immutable.Map({
  content: '',
});

function reducer(state = initState, action: any) {
  switch (action.type) {
    case 'CHANGE_CONTENT':
      return state.set('content', action.value);
    default:
      return state;
  }
}

export default reducer;
