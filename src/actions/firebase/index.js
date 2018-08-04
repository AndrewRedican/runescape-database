import FB           from 'firebase';
import Types        from '../../actions/types';
import config       from './config';
import err          from '../../morphs/err';
import atomicUpdate from '../../morphs/atomicupdate';

/**
 * Deconstruct Types
 **/

FB.initializeApp(config);
const DB = FB.database();

export async function get(path){
    err.isInvalidPath(arguments,'path',path);
    let res = await DB.ref('/' + path).once('value');
    if(res) res = res.val();
    return res;
};

export function write(path,data){
    err.isInvalidPath(arguments,'path',path);
    err.isInvalidWriteData(arguments,'data',data);
    DB.ref('/' + path).set(data);
    return true;
};

export function newPushKey(){
    return DB.ref().push().getKey();
};

export function insert(path,data){
    err.isInvalidPath(arguments,'path',path);
    err.isInvalidWriteData(arguments,'data',data);
    return DB.ref('/' + path).push(data).getKey();
};

export function update(data){
    err.isInvalidWriteData(arguments,'data',data);
    DB.ref().update(data);
    return true;
};

export function remove(path){
    err.isInvalidPath(arguments,'path',path);
    DB.ref('/' + path).remove();
    return true;
};

export function unwatch(path){
    err.isInvalidPath(arguments,'path',path);
    DB.ref('/' + path).off();
    return true;
};

export function pendingUpdate(){
    return new atomicUpdate(DB);
};