import FB from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import config       from './config';
import err          from '../../morphs/err';
import atomicUpdate from '../../morphs/atomicupdate';

FB.initializeApp(config);
const DB = FB.database();

let provider = new FB.auth.GoogleAuthProvider();

provider.addScope('profile');
provider.addScope('email');

FB.auth().useDeviceLanguage();



export async function get(path){
    err.isInvalidPath('path',path);
    let res = await DB.ref('/' + path).once('value');
    if(res) res = res.val();
    return res;
};

export function write(path,data){
    err.isInvalidPath('path',path);
    err.isInvalidWriteData('data',data);
    DB.ref('/' + path).set(data);
    return true;
};

export function newPushKey(){
    return DB.ref().push().getKey();
};

export function insert(path,data){
    err.isInvalidPath('path',path);
    err.isInvalidWriteData('data',data);
    return DB.ref('/' + path).push(data).getKey();
};

export function update(data){
    err.isInvalidWriteData('data',data);
    DB.ref().update(data);
    return true;
};

export function remove(path){
    err.isInvalidPath('path',path);
    DB.ref('/' + path).remove();
    return true;
};

export function unwatch(path){
    err.isInvalidPath('path',path);
    DB.ref('/' + path).off();
    return true;
};

export function pendingUpdate(){
    return new atomicUpdate(DB);
};