import { combineReducers }  from 'redux';
import UserData             from './userdata';

const rootReducer = combineReducers({
    UserData : UserData
});

export default rootReducer;