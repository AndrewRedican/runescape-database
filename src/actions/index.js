import { get, write, newPushKey, insert, update, remove, unwatch, multiLocationUpdate } from './firebase';
import err   from '../morphs/err';
import Types from './types';

const { FETCH_ALL_DATA, FETCH_USER_DATA } = Types;

export function initialFetch(){
    return async dispatch => {
        const projectKeys = await get('system/projectKeys');
        const { localStorageKey, sessionStorageKey } = projectKeys;
        const
            localData   = localStorage[localStorageKey],
            sessionData = sessionStorage[sessionStorageKey],
            id          = (localData||sessionData);

        console.log({id})

        let UserData = false;
        if(typeof id === 'string') UserData = get(`users/${id}`);

        const payload = {
            AppData : {
                localStorageKey : localStorageKey,
                sessionStorageKey : sessionStorageKey
            },
            UserData : (UserData||false)
        };
        dispatch({ 
            type    : FETCH_ALL_DATA,
            payload : payload
        });
    };
};

function fetchUserData(id){
    err.isNotType('id',id,'string');
    return dispatch => { 
        dispatch({ type : FETCH_USER_DATA, payload : (get(`users/${id}`)||false) });
    };
};

//if(typeof id === 'string') fetchUserData(id);