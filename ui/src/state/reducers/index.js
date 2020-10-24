import { combineReducers } from 'redux';

import reducer from './controls';

const rootReducer = combineReducers({
    controls: reducer
});

export default rootReducer;