import { get, write, newPushKey, insert, update, remove, unwatch, multiLocationUpdate } from './firebase';
import err   from '../morphs/err';
import Types from './types';

const { FETCH_ALL_DATA, FETCH_USER_DATA } = Types;

export function initialFetch(){
    return async dispatch => {
        const localStorageKey = await get('system/projectKeys/localStorageKey');
        let localData = localStorage.getItem(localStorageKey);
        try{
            if(typeof localData === 'string') localData = JSON.parse(localData);
        }
        catch(error){
            console.error(error);
        }
        let
            useLocalData = true,
            UserData = false;
        if(typeof localData === 'object'){
            const keyNames = ['id','email','name','picture']
            for(var i = 0; i < keyNames.length; i++){
                const keyName = keyNames[i];
                if(!(keyName in localData)){
                    useLocalData = false;
                    break;
                }
            }
        }
        if(useLocalData) UserData = localData;
        else UserData = await get(`users/${localData.id}`);
        const payload = {
            AppData : {
                localStorageKey : localStorageKey
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