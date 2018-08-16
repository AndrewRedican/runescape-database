import { combineReducers }  from 'redux'
import UserData             from './userdata'
import AppData              from './appdata'

const rootReducer = combineReducers({
    AppData  : AppData,
    UserData : UserData
})

export default rootReducer