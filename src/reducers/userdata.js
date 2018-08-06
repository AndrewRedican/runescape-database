import Types from '../actions/types';

const { FETCH_USER_DATA, FETCH_ALL_DATA } = Types;

export default (state = null, action) => {
    switch(action.type){
        case FETCH_USER_DATA : return action.payload;
        case FETCH_ALL_DATA  : return action.payload.UserData;
    }
    return state;
};