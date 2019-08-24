import {createStore} from 'redux'



const baseStore = {
    magnet:"",
    title:"",
    poster:""
}

function baseReducer(state = baseStore, action) {
    let newState = {...state}
    switch (action.type) {
        case "CHANGE_MAGNET":
            newState.magnet = action.payload
            return newState
        case "CHANGE_TITLE":
            newState.title = action.payload
            newState.poster = ""
            return newState
        case "CHANGE_POSTER":
            newState.poster = action.payload
            return newState
        default:
            return newState
    }
}

const store = createStore(baseReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store