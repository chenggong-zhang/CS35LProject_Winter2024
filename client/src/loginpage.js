import React, {useRef, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const loginWithEmail = async (email) => {
    try {
      const response = await axios.post('http://localhost:4000/auth/email', {
        email: email
      });
      // console.log("axios sucessed");
      if (response.data.ok) {  
        return response.data; 
      } else {
        throw new Error(response.data.error || 'Unknown error occurred');
      }
    } catch (error) {
      console.log('Login failed');
      // console.log(error);
    }
  };


const verifyEmailWithOtp = async (email, otp, navigate) => {
    try {
      console.log(email)
      const response = await axios.post('http://localhost:4000/auth/email/verify', {
        email: email,
        otp: otp
      });
      if (response.data.ok) {
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('userObject',JSON.stringify(response.data.user))
        // console.log("email verified")
        return response.data.user; 
      } if (response.status === 401){
        navigate('/')
      }
      else {
        throw new Error(response.data.error || 'Unknown error occurred');
      }
    } catch (error) {
      console.log(error)
      console.error('Email verification failed', error);
      throw error;
    }
};


// other's data, for testing purpose only
// retrieving user's information
const getUser = async (userid, navigate, token) => {
  try {
    const response = await axios.get('http://localhost:4000/user/'+userid, 
    {headers: {
      'Authorization': `Bearer ${token}` // Include the JWT token in the Authorization header
    }});
    if (response.data.ok) {
      localStorage.setItem('otherObject',JSON.stringify(response.data.user));
      localStorage.setItem('isSelf', response.data.is_self);
      console.log("other user's object sucessflly retrieved")
    }else if (response.status === 401){
      navigate('/')
    }
    else {
      throw new Error(response.data.error || 'Unknown error occurred/other user');
    }
  } catch (error) {
    console.log(error)
    console.error("Failed to retrieve other user's information", error);
    throw error;
  }
};


class MainLogin extends React.Component{
  constructor(props){
    super(props);
    this.state={
      opt: null,
      email: null,
      current: null
    };
  }
  setEmail=(email)=>{
    this.setState({email});
  }
  setCurrent=(current)=>{
    this.setState({current});
  }
  setOpt=(opt)=>{
    this.setState({opt});
  }
    render()
    {
      return(
<div style={{width: '100%', height: '100%', position: 'relative', background: '#E6EAEF'}}>
  <div style={{ width: 320, height: 50, left: '40%', top: 155, position: 'absolute', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
  <div style={{position: 'absolute', bottom: 55, color: '#F2F2F2', fontSize: 20, fontFamily: 'Quicksand', fontWeight: '700', letterSpacing: 0.20, wordWrap: 'break-word'}}>email</div>
        <UserTypingBoard propsData={{state:this.state.email, setState:this.setEmail, current:this.state.current, setCurrent:this.setCurrent}}/>
  </div>
  <PassWord email={this.state.email} current={this.state.current} opt={this.state.opt} setOpt={this.setOpt} setCurrent={this.setCurrent}/>
</div>
      )
    }
}

function PassWord({email, current, opt, setOpt, setCurrent}){
  if (email==null){
    return null;
  }
  else{
    return (
  <div style={{ width: 320, height: 50, left: '40%', top: 250, position: 'absolute', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
      <div style={{position: 'absolute', bottom: 55, color: '#F2F2F2', fontSize: 20, fontFamily: 'Quicksand', fontWeight: '700', letterSpacing: 0.20, wordWrap: 'break-word'}}>password</div>
    <UserTypingBoard propsData={{state: opt, setState: setOpt, current: current, setCurrent:setCurrent}}/>
  </div>
    );
  }
}

function UserTypingBoard({propsData}) {
  const {state, setState, current, setCurrent}=propsData
  const navigate = useNavigate();
  const inputRef = useRef();


  const userid="65e9221302d5aecd2692a33e"
  const token=localStorage.getItem('accessToken');


  const focusTextInput = () => {
    inputRef.current.focus();
  };
  const handleKeyPress = (event)=>{
    if (event.key==='Enter'){
      setState(inputRef.current.value)
    }
  }
  useEffect(()=>{
    if (state){
      if (current===null){
        loginWithEmail(state);
        setCurrent(inputRef.current.value)
      }
      else{
        verifyEmailWithOtp(current, state, navigate)
        getUser(userid, navigate, token)
        navigate('/profile')
      }
    }
  },[state]);

  return (
    <div>
      <input ref={inputRef} onKeyDown={handleKeyPress} type="text" style={{ width: 320, height: 50, bottom: 0, position: 'absolute', background: '#E6EAEF', borderRadius: 100 }} />
      <div onClick={focusTextInput} style={{ cursor: 'pointer', textAlign: 'center', lineHeight: '20px' }}></div>
    </div>
  );
}



export default MainLogin;

