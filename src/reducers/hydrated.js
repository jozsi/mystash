import { REHYDRATE } from 'redux-persist/constants';

const reducer = (state = false, { type }) => (type === REHYDRATE ? true : state);

export default reducer;
