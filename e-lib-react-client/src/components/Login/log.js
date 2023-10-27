import axios from 'axios';
import { setUser } from '../Reducer/userReducer';

const log = (email, password)=>{
    return async dispatch =>{
        try {
            // Make a POST request to the backend API with the form data
            const response = await axios.post('http://localhost:5000/users/login', {
              email ,
              password,
            });
            console.log(response.data);
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
          } catch (error) {
            console.error('Error posting data:', error);
          }
    }
}
export default log