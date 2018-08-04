import { combineReducers }  from 'redux';
import Test                 from './test';

const rootReducer = combineReducers({
    test : Test
});

export default rootReducer;