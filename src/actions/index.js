import { get, write, newPushKey, insert, update, remove, unwatch, multiLocationUpdate } from './firebase';
import err   from '../morphs/err';
import Types from './types';

const { FETCH_USER_DATA } = Types;

export function initialFetch(){

    let id = '';
    // fetch session project keys "localStorage" / SessionStorage

    // look for data in localStorage / SessionStorage

    // if data found, compare email/string fetch data

    if(typeof id === 'string') fetchUserData(id);

};

function fetchUserData(id){
    err.isNotType('id',id,'string');
    return dispatch => { 
        dispatch({ type : FETCH_USER_DATA, payload : (get(`users/${id}`)||false) });
    };
};