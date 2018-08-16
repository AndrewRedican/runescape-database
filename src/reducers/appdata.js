import Types from '../actions/types'

const { FETCH_ALL_DATA } = Types

export default (state = null, action) => {
    switch(action.type){
        case FETCH_ALL_DATA  : return action.payload.AppData
    }
    return state
}