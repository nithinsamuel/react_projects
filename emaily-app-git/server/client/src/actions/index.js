import axios from 'axios';
import {FETCH_USER} from './types';
// code refactored using async/await and arrow functions
export const fetchUser = () => {
    return async (dispatch)=>{
        // relative path used - development uses proxy(setupProxy.js),
        // -prod no proxy as server and client in same environment 
        const res=await axios.get('/api/current_user')
        dispatch({type:FETCH_USER,payload:res.data})
    }
}
// un refactored code 
// export const fetchUser = () => {
//     return function(dispatch){
//         axios
//         .get('/api/current_user')
//         .then(res=>dispatch({type:FETCH_USER,payload:res}))
//     }
// }
export const handleToken=(token)=>async dispatch=>{
    // make post request to backend server
    const res=await axios.post('/api/stripe',token);
    // the backend server will send back the current user model with the updated credits info
    // so we can reuse the exact same FETCH_USER type we created previously
    // if we dispatch an action with FETCH_USER and that contains a payload of the user model
    //the authreducer will automatically pick it up, and in theory anything inside our app that depends on user model will automatically be updated
    //if the header component looks at the usermodel, when authreducer picks up the updated user model the header is updated with the credits info
    dispatch({type:FETCH_USER,payload:res.data})
}
