import Styles from '../Styles';
import {useState, useRef} from 'react';
// import {useNavigate} from 'react-router-dom';
// import { Form } from 'react-final-form';
import PropTypes from 'prop-types';

async function loginUser(credentials) {
    return fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: 'foo',
        body: 'bar',
        userId: 1,
      })
    })
    .then(data => data.json())
}

export default function Login({ setToken,loadingFunc }){
    // const [loading, setLoading] = useState(false);

    const usernameRef = useRef();
    const passwordRef = useRef();

    // const navigate = useNavigate();
    const [formValue, setFormValue] = useState({username:'',password:''});
    async function handleSubmit(e){
        e.preventDefault();
        // setLoading(true);
        loadingFunc(true);
        let username = usernameRef.current.value;
        let password = passwordRef.current.value;
        const token = await loginUser({
            username,
            password
        });
        setToken(token);
        loadingFunc(false);
        // setLoading(false);
    }
    return(
    <Styles>
        <form  onSubmit={handleSubmit}>
            <div><input type="text" placeholder='username' ref={usernameRef} className='username'/></div>
            <div><input type="password" placeholder='password' ref={passwordRef} className='password'/></div>
            <center><button type='submit' onSubmit={handleSubmit}>Login</button></center>    
        </form>
    </Styles>);
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}