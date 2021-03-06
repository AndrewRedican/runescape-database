import FB from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import config       from './config'
import err          from '../../morphs/err'
import atomicUpdate from '../../morphs/atomicupdate'
import emailToId    from '../../morphs/emailtoid'
import idToEmail    from '../../morphs/idtoemail'
import Types        from '../types'

const { FETCH_USER_DATA } = Types

FB.initializeApp(config)
const
    DB   = FB.database(),
    Auth = FB.auth()

export async function googleAuthentication(options){
    return async dispatch => {
        let provider = new FB.auth.GoogleAuthProvider()
        provider.addScope('profile')
        provider.addScope('email')
        Auth.useDeviceLanguage()
        let result
        try{
            result = await Auth.signInWithPopup(provider)
            if(result)
            result = updateUserInformation('google',{
                isNewUser  : result.additionalUserInfo.isNewUser,
                providerId : result.additionalUserInfo.providerId,
                credential : {
                    accessToken : result.credential.accessToken,
                    idToken     : result.credential.idToken
                },
                operationType : result.operationType,
                displayName   : result.user.displayName,
                refreshToken  : result.user.refreshToken,
                uid           : result.user.uid,
                email         : result.user.email,
                metadata      : result.user.metadata,
                picture       : result.user.photoURL
            },options)
            dispatch({ 
                type    : FETCH_USER_DATA,
                payload : result
            })
        }
        catch(error){
            const { code, message, email, credential } = error
            console.error({error, code, message, email, credential})
            return false
        }
    }
}

export async function get(path){
    err.isInvalidPath('path',path)
    let res = await DB.ref('/' + path).once('value')
    if(res) res = res.val()
    return res
}

export function write(path,data){
    err.isInvalidPath('path',path)
    err.isInvalidWriteData('data',data)
    DB.ref('/' + path).set(data)
    return true
}

export function newPushKey(){
    return DB.ref().push().getKey()
}

export function insert(path,data){
    err.isInvalidPath('path',path)
    err.isInvalidWriteData('data',data)
    return DB.ref('/' + path).push(data).getKey()
}

export function update(data){
    err.isInvalidWriteData('data',data)
    DB.ref().update(data)
    return true
}

export function remove(path){
    err.isInvalidPath('path',path)
    DB.ref('/' + path).remove()
    return true
}

export function unwatch(path){
    err.isInvalidPath('path',path)
    DB.ref('/' + path).off()
    return true
}

export function multiLocationUpdate(){
    return new atomicUpdate(DB)
}

function updateUserInformation(authenticationType='unknown',userData,options){
    try{ 
        err.isNotType('authenticationType',authenticationType,'string')
        err.isInvalidWriteData('userData',userData)
        let userUpdate = {}
        switch(authenticationType){
            case 'google' :
                const userId = emailToId(userData.email)
                const now    = new Date().getTime()
                userUpdate = {
                    id      : userId,
                    email   : userData.email,
                    name    : userData.displayName,
                    picture : userData.picture,
                    creationTime : {
                        string : userData.metadata.creationTime,
                        number : parseInt(userData.metadata.a)
                    },
                    lastSignInTime : {
                        string : userData.metadata.lastSignInTime,
                        number : parseInt(userData.metadata.b)
                    },
                    lastProfileUpdate : {
                        string : new Date(now).toUTCString(),
                        number : now
                    }
                }
                multiLocationUpdate()
                .write(`users/${userId}`,userUpdate)
                .commit()
            break
            case 'facebook' :
                // Not Available Yet
            break
        }
        if(Object.keys(userUpdate).length>0)
        if('localStorageKey' in options)
        if(typeof options.localStorageKey === 'string')
        localStorage.setItem(options.localStorageKey,JSON.stringify(userUpdate))
        return userUpdate
    }
    catch(error){
        console.error(`Could not update user's records using ${authenticationType} authentication`,error)
    }
}