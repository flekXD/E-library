const SET_USER = "SET_USER"
const LOGOUT = "LOGOUT"

const defaultState = {
    currentUser :{},
    isAuth: false
}

export default function userReducer(state = defaultState, action){
    if( action.type == 'SET_USER'){
        return{
        ...state,
        currentUser: action.payload.user,
        isAuth: true
        }
    }
    else if( action.type == 'LOGOUT'){
        localStorage.removeItem('token')
        return{
        ...state,
        currentUser: {},
        isAuth: false
        }
    }
    else{
        return state
    }
}

export const setUser = user =>({type : SET_USER, payload: user})
export const logout = () =>({type : LOGOUT})