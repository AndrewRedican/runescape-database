import Types from '../actions/types';

const { FETCH_USER_DATA } = Types;

export default (state = null, action) => {
    switch(action.type){
        case FETCH_USER_DATA :  return action.payload;
    }
    return state;
};