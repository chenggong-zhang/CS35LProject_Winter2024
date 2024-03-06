import React, {useRef,useState, useEffect} from 'react';
import axios from 'axios';

const baseURL = 'http://localhost:4000/'
    

const loginWithEmail = async (email) => {
  console.log("login entered")
    try {
      const response = await axios.post('http://localhost:4000/auth/email', {
        email: email
      });
      console.log("axios sucessed");
      if (response.data.ok) {  
        return response.data; 
      } else {
        throw new Error(response.data.error || 'Unknown error occurred');
      }

    } catch (error) {
      // console.error('Login failed', error);
      console.log(error)
      throw error;
    }
  };


const verifyEmailWithOtp = async (email, otp) => {
    try {
      const response = await axios.post('${baseURL}/auth/email/verify', {
        email: email,
        otp: otp
      });
  
      if (response.data.ok) {
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('userObject', response.data.user)
  
        return response.data.user; 
      } else {
        throw new Error(response.data.error || 'Unknown error occurred');
      }
    } catch (error) {
      console.error('Email verification failed', error);
      throw error;
    }
};


class Main extends React.Component{
    render(){
      return(
<div style={{width: '100%', height: '100%', position: 'relative', background: '#E6EAEF'}}>
  <div style={{ width: 320, height: 50, left: '40%', top: 155, position: 'absolute', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
  {/* <div style={{ width: 320, height: 50, bottom: 0, position: 'absolute', background: '#F95337', borderRadius: 100 }}> */}
        <UserTypingBoard/>
  {/* </div> */}
  </div>
</div>
      )
    }
}

function UserTypingBoard() {

  const[email, setEmail]=useState(null)
  const[opt, setOpt]=useState(null)

  const inputRef = useRef();
  const focusTextInput = () => {
    inputRef.current.focus();
  };
  const handleKeyPress = (event)=>{
    if (event.key=='Enter'){
      setEmail(inputRef.current.value)
      inputRef.current.value = '';
    }
  }
  useEffect(()=>{
    if (email){
      loginWithEmail(email);
    }
  },[email]);

  return (
    <div>
      <input ref={inputRef} onKeyDown={handleKeyPress} type="text" style={{ width: 320, height: 50, bottom: 0, position: 'absolute', background: '#E6EAEF', borderRadius: 100 }} />
      <div onClick={focusTextInput} style={{ cursor: 'pointer', textAlign: 'center', lineHeight: '20px' }}></div>
    </div>
  );
}


export default Main;

